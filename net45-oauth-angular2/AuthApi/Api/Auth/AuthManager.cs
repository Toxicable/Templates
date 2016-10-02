using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AuthApi.Api.Auth.Controllers;
using AuthApi.Data;
using AuthApi.Data.Tables;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace AuthApi.Api.Auth
{
    public class AuthManager : IDisposable
    {
        private readonly ApplicationDbContext _ctx;

        private readonly UserManager<UserEntity> _userManager;

        public AuthManager()
        {
            _ctx = new ApplicationDbContext();
            _userManager = new UserManager<UserEntity>(new UserStore<UserEntity>(_ctx));
        }


        public ApiClientEntity FindClient(string clientId)
        {
            var client =  _ctx.ApiClients.Find(clientId);

            return client;
        }

        public async Task<bool> AddRefreshToken(RefreshTokenEntity token)
        {
            var existingToken =
                _ctx.RefreshTokens.SqlQuery(
                    "SELECT TOP 1 * FROM dbo.RefreshTokens WHERE ApiClient_Id = @p0 and User_Id = @p1 ", token.User?.Id, token.ApiClient?.Id).FirstOrDefault();

            //var existingToken = _ctx.RefreshTokens.SingleOrDefault(r => r.User.Id == token.User.Id && r.ApiClient.Id == token.ApiClient.Id);

            if (existingToken != null)
            {
                var result = await RemoveRefreshToken(existingToken);
            }

            _ctx.RefreshTokens.Add(token);

            return await _ctx.SaveChangesAsync() > 0;
        }

        public async Task<bool> RemoveRefreshToken(string refreshTokenId)
        {
            var refreshTokenEntity = await _ctx.RefreshTokens.FindAsync(refreshTokenId);

            if (refreshTokenEntity != null)
            {
                _ctx.RefreshTokens.Remove(refreshTokenEntity);
                return await _ctx.SaveChangesAsync() > 0;
            }

            return false;
        }

        public async Task<bool> RemoveRefreshToken(RefreshTokenEntity refreshTokenEntity)
        {
            _ctx.RefreshTokens.Remove(refreshTokenEntity);
            return await _ctx.SaveChangesAsync() > 0;
        }

        public async Task<RefreshTokenEntity> FindRefreshToken(string refreshTokenEntityId)
        {
            var refreshTokenEntity = await _ctx.RefreshTokens.FindAsync(refreshTokenEntityId);

            return refreshTokenEntity;
        }

        public List<RefreshTokenEntity> GetAllRefreshTokenEntitys()
        {
            return _ctx.RefreshTokens.ToList();
        }

        public async Task<IdentityResult> AddRole(UserEntity user, UserRoles role)
        {
            var result = await _userManager.AddClaimAsync(user.Id, new Claim(ClaimTypes.Role, role.ToString()));
            return result;
        }

        public async Task<IdentityResult> RegisterUser(RegisterBindingModel userModel)
        {
            var user = new UserEntity
            {
                UserName = userModel.UserName,
                Email = userModel.UserName
            };

            var result = await _userManager.CreateAsync(user, userModel.Password);

            return result;
        }

        public async Task<UserEntity> FindUser(string userName, string password)
        {
            var user = await _userManager.FindAsync(userName, password);

            return user;
        }

        public async Task<UserEntity> FindUser(string userName)
        {
            var user = await _userManager.FindByEmailAsync(userName);

            return user;
        }

        public void Dispose()
        {
            _ctx.Dispose();
            _userManager.Dispose();

        }
    }
}
