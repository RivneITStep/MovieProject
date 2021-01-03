using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject.DTO.Models
{
    public class NewsArticleDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public string PictureUrl { get; set; }
        public string UserId { get; set; }
    }
}
