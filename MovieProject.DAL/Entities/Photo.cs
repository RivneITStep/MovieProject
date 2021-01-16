using System.ComponentModel.DataAnnotations;

namespace MovieProject.DAL.Entities
{
    public class Photo
    {
        [Key]
        public int Id { get; set; }
        public string PictureUrl { get; set; }
        public int ActorId { get; set; }
        public virtual Actor Actor { get; set; }
    }
}