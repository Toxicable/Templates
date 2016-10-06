namespace AspNetIdentity.Data.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<AspNetIdentity.Data.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(AspNetIdentity.Data.ApplicationDbContext context)
        {
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ApplicationDbContext()));

            var user = new ApplicationUser()
            {
                UserName = "fabianwiles@live.com",
                Email = "fabianwiles@live.com",
                EmailConfirmed = true,
                AccountCreated = DateTime.Now.AddYears(-3)
            };

            manager.Create(user, "123456");

            if (roleManager.Roles.Count() == 0)
            {
                roleManager.Create(new IdentityRole { Name = "SuperAdmin" });
                roleManager.Create(new IdentityRole { Name = "Admin" });
                roleManager.Create(new IdentityRole { Name = "User" });
            }

            var adminUser = manager.FindByName("fabianwiles@live.com");

            manager.AddToRoles(adminUser.Id, new string[] { "SuperAdmin", "Admin" });
        }
    }
}
