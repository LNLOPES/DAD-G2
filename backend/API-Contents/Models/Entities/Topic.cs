
namespace API_Contents.Models.Entities
{
    public class Topic
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public Guid? DisciplineId { get; set; }
    }
}
