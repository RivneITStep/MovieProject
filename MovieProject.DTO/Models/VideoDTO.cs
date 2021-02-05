using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject.DTO.Models
{
    public class VideoDTO
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public double Price { get; set; }
        public int MovieId { get; set; }
    }
}
