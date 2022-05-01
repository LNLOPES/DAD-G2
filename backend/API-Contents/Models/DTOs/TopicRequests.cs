using System.ComponentModel.DataAnnotations;

namespace API_Contents.Models.DTOs
{
    public class SaveTopicRequest
    {
        [Required]
        [StringLength(100)]
        public string? Title { get; set; }
        [Required]
        [StringLength(1000)]
        public string? Description { get; set; }
        [Required]
        public Guid? DisciplineId { get; set; } 
    }
}
