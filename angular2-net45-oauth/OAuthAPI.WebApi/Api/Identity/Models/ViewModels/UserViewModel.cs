using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace OAuthAPI.WebApi.Api.Identity.Models.ViewModels
{
    public class UserViewModel
    {

        public string Url { get; set; }
        public string Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public int Level { get; set; }
        public DateTime JoinDate { get; set; }
        public IList<string> Roles { get; set; }
        public IList<Claim> Claims { get; set; }

    }
}