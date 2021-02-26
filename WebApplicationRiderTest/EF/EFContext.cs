using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApplicationRiderTest.EF.Entities;

namespace WebApplicationRiderTest.EF
{
    public class EFContext : IdentityDbContext<User>
    {
        public EFContext(DbContextOptions<EFContext> options) : base(options) { }
        public DbSet<Movie> movies { get; set; }
        public DbSet<Actor> actors { get; set; }
        public DbSet<Photo> photos { get; set; }
        public DbSet<Review> reviews { get; set; }
        public DbSet<Video> videos { get; set; }
    }
}