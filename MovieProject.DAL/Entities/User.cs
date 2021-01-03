using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject.DAL.Entities
{
    public class User : IdentityUser
    {
        public virtual ICollection<Review> reviewUser { get; set; }
        public virtual ICollection<NewsArticle> newsArticleUser { get; set; }
    }
}
