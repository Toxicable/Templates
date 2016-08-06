using Microsoft.EntityFrameworkCore;
using AppName.Data.Models;

namespace CoreAngular2WebpackHmrSass.Data
{
    public class ApplicationDbContext : DbContext//OpenIddictDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
    {
        public ApplicationDbContext(DbContextOptions options)
            : base(options) {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            base.OnModelCreating(builder);
            
        }
    }    
}
