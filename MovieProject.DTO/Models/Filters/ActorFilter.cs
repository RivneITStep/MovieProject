using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject.DTO.Models.Filters
{
    public class ActorFilter
    {
        public string Country { get; set; } = String.Empty;
        public int BirthYear { get; set; } = 0;
        public int CountFilms { get; set; } = 0;
    }
}
