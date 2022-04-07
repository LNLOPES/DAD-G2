namespace API_Contents.Entities
{
    public class Content
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Url { get; set; }

        public int DisciplineId { get; set; }
        public int CategoryId { get; set; }
    }
}
