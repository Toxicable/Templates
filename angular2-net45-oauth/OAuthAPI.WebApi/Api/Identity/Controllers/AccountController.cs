using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Owin.Security.Provider;
using Newtonsoft.Json.Linq;
using OAuthAPI.Data.Identity;
using OAuthAPI.WebApi.Api.Identity.Managers;
using OAuthAPI.WebApi.Api.Identity.Models.BindingModels;
using OAuthAPI.WebApi.Api.Identity.Models.ViewModels;
using OAuthAPI.WebApi.Api.Results;
using SendGrid;

namespace OAuthAPI.WebApi.Api.Identity.Controllers
{
    [Authorize]
    public class AccountController : BaseApiController
    {
        //GET: api/account/IsAuthenticated
        [HttpGet]
        public async Task<IHttpActionResult> IsAuthenticated()
        {
            return Ok("true");
        }

        //GET: api/account/CreateUser
        [HttpPost, AllowAnonymous]
        public async Task<IHttpActionResult> Create(CreateUserBindingModel createUserModel)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new ApplicationUser()
            {
                UserName = createUserModel.Username,
                Email = createUserModel.Username,
                AccountCreated = DateTimeOffset.Now,
            };


            IdentityResult addUserResult = await AppUserManager.CreateAsync(user, createUserModel.Password);

            if (!addUserResult.Succeeded)
            {
                return GetIdentityErrorResult(addUserResult);
            }

            //Uri locationHeader = new Uri(Url.Link("GetUser", new { Id = user.Id }));

            //return Created(locationHeader, _mapper.Map<UserViewModel>(user));
            return Ok();
        }

        //GET: api/account/SendConfirmEmail
        [HttpGet]
        public async Task<IHttpActionResult> SendConfirmEmail()
        {
            var userId = User.Identity.GetUserId();
            string code = await AppUserManager.GenerateEmailConfirmationTokenAsync(userId);

           // var callbackUrl = new Uri(Url. Link("ConfirmEmail", new {  userId, code }));

            //we need to do this otherwise the + in the string gets replaced with a space
            var urlCode = Uri.EscapeDataString(code);
            var url = $"{Request.RequestUri.Scheme}://{Request.RequestUri.Authority}/auth/verify?userId={userId}&code={urlCode}";

            var body = $"Please confirm your account by clicking <a href=\"{url}\">here</a>";
            
            await AppUserManager.SendEmailAsync(userId, "Confirm your account", body);
                                                    
            return Ok();
        }

        //GET: api/account/ConfirmEmail
        [HttpGet, AllowAnonymous]
        public async Task<IHttpActionResult> ConfirmEmail(string userId = "", string code = "")
        {
            var escapedCode  = Uri.UnescapeDataString(code);
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(escapedCode))
            {
                ModelState.AddModelError("", "User Id and Code are required");
                return BadRequest(ModelState);
            }

            IdentityResult result = await AppUserManager.ConfirmEmailAsync(userId, code);

            if (result.Succeeded)
            {
                return Ok();
            }
            
            return GetIdentityErrorResult(result);
            
        }
        //POST: api/account/ChangePassword
        [HttpPost]
        public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await AppUserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                return GetIdentityErrorResult(result);
            }

            return Ok();
        }

        [HttpPost, AllowAnonymous]
        public async Task<IHttpActionResult> SendForgotPassword(SendForgotPasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await AppUserManager.FindByNameAsync(model.UserName);
            string code = await AppUserManager.GeneratePasswordResetTokenAsync(user.Id);

            //we need to do this otherwise the + in the string gets replaced with a space
            var urlCode = Uri.EscapeDataString(code);
            var url = $"{Request.RequestUri.Scheme}://{Request.RequestUri.Authority}/auth/reset-password?userId={user.Id}&code={urlCode}";

            await AppUserManager.SendEmailAsync(user.Id, "Reset Password", "Please reset your password by clicking <a href=\"" + url + "\">here</a>");

            return Ok();
        }

        [HttpPost, AllowAnonymous]
        public async Task<IHttpActionResult> ResetPassword(ResetPasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await AppUserManager.FindByIdAsync(model.UserId);
            if (user == null)
            {
                ModelState.AddModelError("", "Account does not exist");
                return BadRequest(ModelState);
            }

            var result = await AppUserManager.ResetPasswordAsync(user.Id, model.Code, model.Password);

            if (result.Succeeded)
            {
                return Ok();
            }

            return GetIdentityErrorResult(result);

        }

        private IAuthenticationManager Authentication
        {
            get { return Request.GetOwinContext().Authentication; }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("ObtainLocalAccessToken")]
        public async Task<IHttpActionResult> ObtainLocalAccessToken(string provider, string externalAccessToken)
        {

            if (string.IsNullOrWhiteSpace(provider) || string.IsNullOrWhiteSpace(externalAccessToken))
            {
                return BadRequest("Provider or external access token is not sent");
            }

            var verifiedAccessToken = await VerifyExternalAccessToken(provider, externalAccessToken);
            if (verifiedAccessToken == null)
            {
                return BadRequest("Invalid Provider or External Access Token");
            }

            IdentityUser user = await AppUserManager.FindAsync(new UserLoginInfo(provider, verifiedAccessToken.user_id));

            bool hasRegistered = user != null;

            if (!hasRegistered)
            {
                return BadRequest("External user is not registered");
            }

            //generate access token response
            var accessTokenResponse = GenerateLocalAccessTokenResponse(user.UserName);

            return Ok(accessTokenResponse);

        }

        // POST api/Account/RegisterExternal
        [AllowAnonymous]
        [HttpPost]
        public async Task<IHttpActionResult> RegisterExternal(RegisterExternalBindingModel model)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var verifiedAccessToken = await VerifyExternalAccessToken(model.Provider, model.ExternalAccessToken);
            if (verifiedAccessToken == null)
            {
                return BadRequest("Invalid Provider or External Access Token");
            }

            var user = await AppUserManager.FindAsync(new UserLoginInfo(model.Provider, verifiedAccessToken.user_id));

            bool hasRegistered = user != null;

            if (hasRegistered)
            {
                return BadRequest("External user is already registered");
            }

            user = new ApplicationUser() { UserName = model.UserName };

            IdentityResult result = await AppUserManager.CreateAsync(user);
            if (!result.Succeeded)
            {
                return GetIdentityErrorResult(result);
            }

            var info = new ExternalLoginInfo()
            {
                DefaultUserName = model.UserName,
                Login = new UserLoginInfo(model.Provider, verifiedAccessToken.user_id)
            };

            result = await AppUserManager.AddLoginAsync(user.Id, info.Login);
            if (!result.Succeeded)
            {
                return GetIdentityErrorResult(result);
            }

            //generate access token response
            var accessTokenResponse = GenerateLocalAccessTokenResponse(model.UserName);

            return Ok(accessTokenResponse);
        }

        // GET api/Account/ExternalLogin
        [OverrideAuthentication]
        [HostAuthentication(DefaultAuthenticationTypes.ExternalCookie)]
        [AllowAnonymous]
        [HttpGet]
        public async Task<IHttpActionResult> GetExternalLogin(string provider, string error = null)
        {
            string redirectUri = string.Empty;

            if (error != null)
            {
                return BadRequest(Uri.EscapeDataString(error));
            }
            var t = HttpContext.Current.Request.Cookies[DefaultAuthenticationTypes.ExternalCookie];
            if (User.Identity.IsAuthenticated)
            {
                return new ChallengeResult(provider, this);
            }

            var redirectUriValidationResult = ValidateClientAndRedirectUri(this.Request, ref redirectUri);

            if (!string.IsNullOrWhiteSpace(redirectUriValidationResult))
            {
                return BadRequest(redirectUriValidationResult);
            }

            ExternalLoginData externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);

            if (externalLogin == null)
            {
                return InternalServerError();
            }

            if (externalLogin.LoginProvider != provider)
            {
                Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);
                return new ChallengeResult(provider, this);
            }

            IdentityUser user = await AppUserManager.FindAsync(new UserLoginInfo(externalLogin.LoginProvider, externalLogin.ProviderKey));

            bool hasRegistered = user != null;

            redirectUri = string.Format("{0}#external_access_token={1}&provider={2}&haslocalaccount={3}&external_user_name={4}",
                                            redirectUri,
                                            externalLogin.ExternalAccessToken,
                                            externalLogin.LoginProvider,
                                            hasRegistered.ToString(),
                                            externalLogin.UserName);

            return Redirect(redirectUri);

        }


        private string ValidateClientAndRedirectUri(HttpRequestMessage request, ref string redirectUriOutput)
        {

            Uri redirectUri;

            var redirectUriString = GetQueryString(Request, "redirect_uri");

            //if (string.IsNullOrWhiteSpace(redirectUriString))
            //{
            //    return "redirect_uri is required";
            //}

            //bool validUri = Uri.TryCreate(redirectUriString, UriKind.Absolute, out redirectUri);

            //if (!validUri)
            //{
            //    return "redirect_uri is invalid";
            //}

            var clientId = GetQueryString(Request, "client_id");

            if (string.IsNullOrWhiteSpace(clientId))
            {
                return "client_Id is required";
            }

            var clientManager = new ClientManager();
            var client = clientManager.FindClient(clientId);

            if (client == null)
            {
                return string.Format("Client_id '{0}' is not registered in the system.", clientId);
            }

            //if (!string.Equals(client.AllowedOrigin, redirectUri.GetLeftPart(UriPartial.Authority), StringComparison.OrdinalIgnoreCase))
            //{
            //    return string.Format("The given URL is not allowed by Client_id '{0}' configuration.", clientId);
            //}

            //redirectUriOutput = redirectUri.AbsoluteUri;

            return string.Empty;

        }

        private string GetQueryString(HttpRequestMessage request, string key)
        {
            var queryStrings = request.GetQueryNameValuePairs();

            if (queryStrings == null) return null;

            var match = queryStrings.FirstOrDefault(keyValue => string.Compare(keyValue.Key, key, true) == 0);

            if (string.IsNullOrEmpty(match.Value)) return null;

            return match.Value;
        }

        private JObject GenerateLocalAccessTokenResponse(string userName)
        {

            var tokenExpiration = TimeSpan.FromDays(1);

            ClaimsIdentity identity = new ClaimsIdentity(OAuthDefaults.AuthenticationType);

            identity.AddClaim(new Claim(ClaimTypes.Name, userName));
            identity.AddClaim(new Claim("role", "user"));

            var props = new AuthenticationProperties()
            {
                IssuedUtc = DateTime.UtcNow,
                ExpiresUtc = DateTime.UtcNow.Add(tokenExpiration),
            };

            var ticket = new AuthenticationTicket(identity, props);

            var accessToken = Startup.OAuthBearerOptions.AccessTokenFormat.Protect(ticket);

            JObject tokenResponse = new JObject(
                                        new JProperty("userName", userName),
                                        new JProperty("access_token", accessToken),
                                        new JProperty("token_type", "bearer"),
                                        new JProperty("expires_in", tokenExpiration.TotalSeconds.ToString()),
                                        new JProperty(".issued", ticket.Properties.IssuedUtc.ToString()),
                                        new JProperty(".expires", ticket.Properties.ExpiresUtc.ToString())
        );

            return tokenResponse;
        }

        private async Task<ParsedExternalAccessToken> VerifyExternalAccessToken(string provider, string accessToken)
        {
            ParsedExternalAccessToken parsedToken = null;

            var verifyTokenEndPoint = "";

            if (provider == "Facebook")
            {
                //You can get it from here: https://developers.facebook.com/tools/accesstoken/
                //More about debug_tokn here: http://stackoverflow.com/questions/16641083/how-does-one-get-the-app-access-token-for-debug-token-inspection-on-facebook

                var appToken = "xxxxx";
                verifyTokenEndPoint = string.Format("https://graph.facebook.com/debug_token?input_token={0}&access_token={1}", accessToken, appToken);
            }
            else if (provider == "Google")
            {
                verifyTokenEndPoint = string.Format("https://www.googleapis.com/oauth2/v1/tokeninfo?access_token={0}", accessToken);
            }
            else
            {
                return null;
            }

            var client = new HttpClient();
            var uri = new Uri(verifyTokenEndPoint);
            var response = await client.GetAsync(uri);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();

                dynamic jObj = (JObject)Newtonsoft.Json.JsonConvert.DeserializeObject(content);

                parsedToken = new ParsedExternalAccessToken();

                if (provider == "Facebook")
                {
                    parsedToken.user_id = jObj["data"]["user_id"];
                    parsedToken.app_id = jObj["data"]["app_id"];

                    if (!string.Equals(Startup.facebookAuthOptions.AppId, parsedToken.app_id, StringComparison.OrdinalIgnoreCase))
                    {
                        return null;
                    }
                }
                else if (provider == "Google")
                {
                    parsedToken.user_id = jObj["user_id"];
                    parsedToken.app_id = jObj["audience"];

                    if (!string.Equals(Startup.googleAuthOptions.ClientId, parsedToken.app_id, StringComparison.OrdinalIgnoreCase))
                    {
                        return null;
                    }

                }

            }

            return parsedToken;
        }

        private class ExternalLoginData
        {
            public string LoginProvider { get; set; }
            public string ProviderKey { get; set; }
            public string UserName { get; set; }
            public string ExternalAccessToken { get; set; }

            public static ExternalLoginData FromIdentity(ClaimsIdentity identity)
            {
                if (identity == null)
                {
                    return null;
                }

                Claim providerKeyClaim = identity.FindFirst(ClaimTypes.NameIdentifier);

                if (providerKeyClaim == null || String.IsNullOrEmpty(providerKeyClaim.Issuer) || String.IsNullOrEmpty(providerKeyClaim.Value))
                {
                    return null;
                }

                if (providerKeyClaim.Issuer == ClaimsIdentity.DefaultIssuer)
                {
                    return null;
                }

                return new ExternalLoginData
                {
                    LoginProvider = providerKeyClaim.Issuer,
                    ProviderKey = providerKeyClaim.Value,
                    UserName = identity.FindFirstValue(ClaimTypes.Name),
                    ExternalAccessToken = identity.FindFirstValue("ExternalAccessToken"),
                };
            }
        }


    }
}