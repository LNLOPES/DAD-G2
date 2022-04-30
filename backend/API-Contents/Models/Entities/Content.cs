using System;

namespace API_Contents.Models.Entities
{
    public class Content
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Url { get; set; }
        public Guid DisciplineId { get; set; }
        public Guid TopicId { get; set; }
    }
}
