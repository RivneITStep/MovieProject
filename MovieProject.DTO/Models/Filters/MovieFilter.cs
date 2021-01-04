using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject.DTO.Models.Filters
{
    public class MovieFilter
    {
        public string Country { get; set; } = String.Empty;
        public string Genre { get; set; } = String.Empty;
        public int Year { get; set; } = 0;
        public float Rating { get; set; } = 0;
    }
}
