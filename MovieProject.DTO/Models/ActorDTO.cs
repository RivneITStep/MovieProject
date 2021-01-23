using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject.DTO.Models
{
    public class ActorDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Fathername { get; set; }
        public string Country { get; set; }
        public int CountFilms { get; set; }
        public string Description { get; set; }
        public int BirthYear { get; set; }
        public int Age { get; set; }
        public string PictureUrl { get; set; }
        public List<PhotoDTO> Photos { get; set; }
        public List<MovieDTO> Movies { get; set; }
    }
}
