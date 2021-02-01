using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MovieProject.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject.DAL
{
    public class EFContext : IdentityDbContext<User>
    {
        public EFContext(DbContextOptions<EFContext> options) : base(options) { }
        public DbSet<Movie> movies { get; set; }
        public DbSet<Actor> actors { get; set; }
        public DbSet<Photo> photos { get; set; }
        public DbSet<Review> reviews { get; set; }
        public DbSet<NewsArticle> articles { get; set; }
        public DbSet<FileModel> files { get; set; }
        public DbSet<Video> videos { get; set; }
    }
}
