using System;
using System.Collections.Generic;
using System.Text;

namespace MovieProject.DesktopClientApp.Core.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
        public string TrailerUrl { get; set; }
        public string Description { get; set; }
    }
}
