using System.ComponentModel.DataAnnotations;

namespace MovieProject.DAL.Entities
{
    public class FileModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
    }
}