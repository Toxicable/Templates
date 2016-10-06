using AspNetIdentity.Data.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace AspNetIdentity.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
        }

        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Client> Clients { get; set; }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

    }
}