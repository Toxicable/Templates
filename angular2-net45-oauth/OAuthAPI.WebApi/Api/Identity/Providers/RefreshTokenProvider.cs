using Microsoft.Owin.Security.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using AspNetIdentity.Data;
using AspNetIdentity.WebApi.Api.Helpers;
using Microsoft.AspNet.Identity.Owin;
using AspNetIdentity.WebApi.Api.Identity.Infrastructure;
using AspNetIdentity.WebApi.Api.Identity.Managers;

namespace AspNetIdentity.WebApi.Api.Identity.Providers
{
    public class RefreshTokenProvider : IAuthenticationTokenProvider
    {
        public void Create(AuthenticationTokenCreateContext context)
        {
            CreateAsync(context).Wait();
        }

        public async Task CreateAsync(AuthenticationTokenCreateContext context)
        {
            if(!context.Ticket.Properties.Dictionary.ContainsKey("as:client_id"))
            {
                return;
            }
            var clientid = context.Ticket.Properties.Dictionary["as:client_id"];

            if (string.IsNullOrEmpty(clientid))
            {
                return;
            }

            var refreshTokenId = Guid.NewGuid().ToString("n");


            var userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();


            var refreshTokenLifeTime = context.OwinContext.Get<string>("as:clientRefreshTokenLifeTime");
            var clientManager = new ClientManager();
            var refreshTokenManager = new RefreshTokenManager();

            var token = new RefreshToken()
            {
                Id = AuthHelper.GetHash(refreshTokenId),
                Client = clientManager.FindClient(clientid),
                User = await userManager.FindByNameAsync(context.Ticket.Identity.Name),
                Issued = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(refreshTokenLifeTime))
            };

            context.Ticket.Properties.IssuedUtc = token.Issued;
            context.Ticket.Properties.ExpiresUtc = token.Expires;

            token.ProtectedTicket = context.SerializeTicket();

            var result = await refreshTokenManager.AddRefreshToken(token);
            //something went wrong here

            if (result)
            {
                context.SetToken(refreshTokenId);
            }

            
        }

        public void Receive(AuthenticationTokenReceiveContext context)
        {
            ReceiveAsync(context).Wait();
        }

        public async Task ReceiveAsync(AuthenticationTokenReceiveContext context)
        {

            //var allowedOrigin = context.OwinContext.Get<string>("as:clientAllowedOrigin");
            //context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { allowedOrigin });

            string hashedTokenId = AuthHelper.GetHash(context.Token);

            var clientManager = new ClientManager();
            var refreshTokenManager = new RefreshTokenManager();

            var refreshToken = await refreshTokenManager.FindRefreshToken(hashedTokenId);
            //if it is null then this probably means that you're trying with an old token

            if (refreshToken != null)
            {
                //Get protectedTicket from refreshToken class
                context.DeserializeTicket(refreshToken.ProtectedTicket);
                var result = await refreshTokenManager.RemoveRefreshToken(hashedTokenId);
            }
        }
    }
}
