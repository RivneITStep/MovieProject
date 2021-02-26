using System.ComponentModel.DataAnnotations;

namespace WebApplicationRiderTest.EF.Entities
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