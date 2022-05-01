
namespace API_Contents.Models.Entities
{
    public class Discipline
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public Guid? TeacherId { get; set; }
    }

    public class DisciplineWithStudents : Discipline
    {
        public Guid[]? StudentsIds { get; set; }
    }
}
