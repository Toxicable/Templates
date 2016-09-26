using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections;
using System.Collections.Generic;

namespace TimeSheeting.Api.Data.Tables
{
    public class UserEntity : IdentityUser
    {


    }

    public enum UserRoles
    {
        Admin,
        GeneralUser
    }

   
}