using System.Collections.Generic;

namespace MovieProject.DTO.Models.Actor
{
    public class ActorAddDTO
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Fathername { get; set; }
        public string Country { get; set; }
        public int CountFilms { get; set; }
        public string Description { get; set; }
        public int BirthYear { get; set; }
        public int Age { get; set; }
        public string PictureUrl { get; set; }
    }
}