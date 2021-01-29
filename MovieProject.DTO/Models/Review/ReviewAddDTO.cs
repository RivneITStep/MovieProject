namespace MovieProject.DTO.Models.Review
{
    public class ReviewAddDTO
    {
        public string Title { get; set; }
        public string Text { get; set; }
        public int MovieId { get; set; }
        public string UserId { get; set; }
    }
}