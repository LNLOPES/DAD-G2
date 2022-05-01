using System.ComponentModel.DataAnnotations;

namespace API_Contents.Models.DTOs
{
    public class SaveDisciplineRequest
    {
        [Required]
        [StringLength(100)]
        public string? Title { get; set; }
        [Required]
        [StringLength(1000)]
        public string? Description { get; set; }
        public Guid? TeacherId { get; set; } 
        public Guid[]? StudentsIds { get; set; }
    }
}
