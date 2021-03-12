using System.ComponentModel.DataAnnotations;

namespace WebApplicationRiderTest.EF.Entities
{
    public class Mark
    {
        [Key]
        public int Id { get; set; }
        public float Value { get; set; }
        public string UserId { get; set; }
        public int MovieId { get; set; }
        public virtual User User { get; set; }
        public virtual Movie Movie { get; set; }
    }
}