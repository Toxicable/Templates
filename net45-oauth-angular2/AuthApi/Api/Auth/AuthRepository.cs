using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using TimeSheeting.Api.Auth.Controllers;
using TimeSheeting.Api.Data;
using TimeSheeting.Api.Data.Tables;

namespace TimeSheeting.Api.Auth
{
    public class AuthRepository : IDisposable
    {
        private readonly ApplicationDbContext _ctx;

        private readonly UserManager<UserEntity> _userManager;

        public AuthRepository()
        {
            _ctx = new ApplicationDbContext();
            _userManager = new UserManager<UserEntity>(new UserStore<UserEntity>(_ctx));
        }



        public async Task<IdentityResult> AddRole(UserEntity user)
        {
            var result = await _userManager.AddClaimAsync(user.Id, new Claim(ClaimTypes.Role, UserRoles.GeneralUser.ToString()));
            return result;
        }

        public async Task<IdentityResult> RegisterUser(RegisterBindingModel userModel)
        {
            var user = new UserEntity
            {
                UserName = userModel.UserName
            };

            var result = await _userManager.CreateAsync(user, userModel.Password);

            return result;
        }

        public async Task<UserEntity> FindUser(string userName, string password)
        {
            var user = await _userManager.FindAsync(userName, password);

            return user;
        }

        public void Dispose()
        {
            _ctx.Dispose();
            _userManager.Dispose();

        }
    }
}
