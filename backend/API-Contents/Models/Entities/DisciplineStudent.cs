
namespace API_Contents.Models.Entities
{
    public class DisciplineStudent
    {
        public Guid Id { get; set; }
        public Guid DisciplineId { get; set; }
        public Guid StudentId { get; set; }
    }
}
