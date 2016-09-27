

using System;
using System.Threading.Tasks;
using AuthApi.Data.Tables;
using Microsoft.Owin.Security.Infrastructure;

namespace AuthApi.Api.Auth.Providers
{
    public class SimpleRefreshTokenProvider : IAuthenticationTokenProvider
    {
        public void Create(AuthenticationTokenCreateContext context)
        {
            CreateAsync(context).Wait();
        }

        public async Task CreateAsync(AuthenticationTokenCreateContext context)
        {
            var clientid = context.Ticket.Properties.Dictionary["as:client_id"];

            if (string.IsNullOrEmpty(clientid))
            {
                return;
            }

            var refreshTokenId = Guid.NewGuid().ToString("n");

            using (AuthRepository _repo = new AuthRepository())
            {
                var refreshTokenLifeTime = context.OwinContext.Get<string>("as:clientRefreshTokenLifeTime");

                var token = new RefreshTokenEntity()
                {
                    Id = AuthHelper.GetHash(refreshTokenId),
                    ApiClient = _repo.FindClient(clientid),
                    User = await _repo.FindUser(context.Ticket.Identity.Name),
                    Issued = DateTime.UtcNow,
                    Expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(refreshTokenLifeTime))
                };

                context.Ticket.Properties.IssuedUtc = token.Issued;
                context.Ticket.Properties.ExpiresUtc = token.Expires;

                token.ProtectedTicket = context.SerializeTicket();

                var result = await _repo.AddRefreshToken(token);
                //something went wrong here

                if (result)
                {
                    context.SetToken(refreshTokenId);
                }

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

            using (AuthRepository _repo = new AuthRepository())
            {
                var refreshToken = await _repo.FindRefreshToken(hashedTokenId);
                //if it is null then this probably means that you're trying with an old token

                if (refreshToken != null)
                {
                    //Get protectedTicket from refreshToken class
                    context.DeserializeTicket(refreshToken.ProtectedTicket);
                    var result = await _repo.RemoveRefreshToken(hashedTokenId);
                }
            }
        }


    }
}