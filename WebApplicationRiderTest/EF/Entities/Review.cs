using System.ComponentModel.DataAnnotations;

namespace WebApplicationRiderTest.EF.Entities
{
    public class Review
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public int MovieId { get; set; }
        public virtual Movie Movie { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
    }
}