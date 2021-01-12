using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject.DAL.Entities
{
    public class NewsArticle
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public string PictureUrl { get; set; }
        public string UserId { get; set; }
        public User newsArcticleUser { get; set; }
    }
}
