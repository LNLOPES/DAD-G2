﻿using System.ComponentModel.DataAnnotations;

namespace API_Contents.Models.DTOs
{
    public class SaveTopicRequest
    {
        [Required]
        [StringLength(100)]
        public string? title { get; set; }
        [Required]
        [StringLength(1000)]
        public string? description { get; set; }
        [Required]
        public Guid? disciplineId { get; set; } 
    }
}
