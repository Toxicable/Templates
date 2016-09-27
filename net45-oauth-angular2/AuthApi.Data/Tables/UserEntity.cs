using System.Collections.Generic;
using Microsoft.AspNet.Identity.EntityFramework;

namespace AuthApi.Data.Tables
{
    public class UserEntity : IdentityUser
    {

        public ICollection<RefreshTokenEntity> RefreshTokens { get; set; }
    }

    public enum UserRoles
    {
        Admin,
        GeneralUser
    }

   
}