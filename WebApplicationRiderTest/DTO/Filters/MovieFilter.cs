using System;

namespace WebApplicationRiderTest.DTO.Filters
{
    public class MovieFilter
    {
        public string Country { get; set; } = String.Empty;
        public string Genre { get; set; } = String.Empty;
        public int Year { get; set; } = 0;
    }
}