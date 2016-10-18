using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using OAuthAPI.WebApi.Api.Identity.Models.ViewModels;
using Microsoft.AspNet.Identity;

namespace OAuthAPI.WebApi.Api.Identity.Controllers
{
    [Authorize(Roles = "SuperAdmin")]
    public class UsersController : BaseApiController
    {
        //GET: api/users/GetUser
        [HttpGet]
        public async Task<IHttpActionResult> GetUsers()
        {
            var users = AppUserManager.Users.Include(u => u.Roles);
            var roles = AppRoleManager.Roles;
            var userInViewModel = users.Select(u => _mapper.Map<UserViewModel>(u));
            
            foreach (var user in userInViewModel)
            {
                user.Roles = roles.Where(r => (users.Single(
                        u => u.Id == user.Id).Roles.Select(a => a.RoleId).Contains(r.Id)
                   ))
                   .Select( j => j.Name)
                   .ToList();
                    
            }

            var usersResults = await userInViewModel.ToListAsync();
            return Ok(usersResults);
        }

        //GET: api/users/GetUser/id
        [HttpGet]
        public async Task<IHttpActionResult> GetUser(string Id)
        {
            //Only SuperAdmin or Admin can delete users (Later when implement roles)
            var user = await AppUserManager.FindByIdAsync(Id);

            if (user != null)
            {
                return Ok(_mapper.Map<UserViewModel>(user));
            }

            return NotFound();

        }

        //GET: api/users/DeleteUser
        [HttpDelete]
        public async Task<IHttpActionResult> DeleteUser(string id)
        {
            throw new NotSupportedException();
            //Only SuperAdmin or Admin can delete users (Later when implement roles)

            var appUser = await this.AppUserManager.FindByIdAsync(id);

            if (appUser != null)
            {
                IdentityResult result = await this.AppUserManager.DeleteAsync(appUser);

                if (!result.Succeeded)
                {
                    return GetIdentityErrorResult(result);
                }

                return Ok();

            }

            return NotFound();

        }
    }
}