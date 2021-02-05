using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject.DAL.Entities
{
    public class Video
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Url { get; set; }
        public double Price { get; set; }
        public int MovieId { get; set; }
        public virtual Movie Movie { get; set; }
    }
}
