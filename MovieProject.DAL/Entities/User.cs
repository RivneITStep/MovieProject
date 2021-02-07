using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject.DAL.Entities
{
    public class User : IdentityUser
    {
        public double Balance { get; set; }
        public string PictureUrl { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<NewsArticle> NewsArticles { get; set; }
    }
}
