using System.ComponentModel.DataAnnotations;

namespace API_Contents.Models.DTOs
{
    public class SaveDisciplineRequest
    {
        [Required]
        [StringLength(100)]
        public string? title { get; set; }
        [Required]
        [StringLength(1000)]
        public string? description { get; set; }
        public Guid? teacherId { get; set; } 
        public Guid[]? studentsIds { get; set; }
    }
}
