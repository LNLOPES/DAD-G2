using System.Net;
using API_Contents.Helpers;
using API_Contents.Models.DTOs;
using API_Contents.Models.Entities;

namespace API_Contents.Services
{
    public interface IContentsService
    {
        public Task<Content[]> getContents();
        public Task<Content> findContentById(Guid id);
        public Task<Content> saveContent(SaveContentRequest content, IFormFile? file);
    }
    public class ContentService : IContentsService
    {
        private readonly IFirebaseService firebaseService;
        public ContentService(IFirebaseService firebaseService)
        {
            this.firebaseService = firebaseService;
        }

        static private List<Content> contents = new List<Content> {
            new Content { Title = "Material didático Ex:1", Description = "", DisciplineId = Guid.NewGuid(), Id = Guid.NewGuid() },
            new Content { Title = "Matéria Prova", Description = "Ajuda para estudar a prova", DisciplineId = Guid.NewGuid(), Id = Guid.NewGuid() },
            new Content { Title = "Some test content", Description = "content description", DisciplineId = Guid.NewGuid(), Id = Guid.NewGuid() }
        };

        public async Task<Content[]> getContents()
        {
            return contents.ToArray();
        }

        public async Task<Content> findContentById(Guid id)
        {
            Content? foundContent = contents.Find(content => content.Id == id);

            if(foundContent == null)
            {
                throw new HttpException(404, "Content not found");
            }

            return foundContent;
        }

        public async Task<Content> saveContent(SaveContentRequest content, IFormFile? file)
        {
            Content newContent = new Content();
            newContent.Id = Guid.NewGuid();

            if(file != null)
            {
                string firebaseUploadDir = $"{content.disciplineId}/{content.topicId}/{newContent.Id}";
                string fileUrl = await firebaseService.uploadFile(firebaseUploadDir, file.FileName, file.OpenReadStream());
                newContent.Url = fileUrl;
            }

            newContent.Title = content.title;
            newContent.Description = content.description; 
            newContent.DisciplineId = content.disciplineId;
            newContent.TopicId = content.topicId;

            contents.Add(newContent);
            
            return newContent;
        }

    }
}
