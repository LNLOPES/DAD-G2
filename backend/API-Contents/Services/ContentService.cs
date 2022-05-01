using System.Net;
using API_Contents.Helpers;
using API_Contents.Models.DTOs;
using API_Contents.Models.Entities;
using API_Contents.Repository;

namespace API_Contents.Services
{
    public interface IContentsService
    {
        public Task<List<Content>> getContents();
        public Task<Content> findContentById(Guid id);
        public Task<Content> saveContent(SaveContentRequest content, IFormFile? file);
        public Task deleteContent(Guid id);
        public Task<Content> patchContent(Guid id, SaveContentRequest content, IFormFile? file);
    }

    public class ContentService : IContentsService
    {
        private readonly IFirebaseService firebaseService;
        private readonly IContentsRepository contentRepository;
        public ContentService(IFirebaseService firebaseService, IContentsRepository contentRepository)
        {
            this.firebaseService = firebaseService;
            this.contentRepository = contentRepository;
        }

        public async Task<List<Content>> getContents()
        {
            return await contentRepository.getContents();
        }

        public async Task<Content> findContentById(Guid id)
        {
            Content? foundContent = await contentRepository.findContentById(id);

            if (foundContent == null)
            {
                throw new HttpException(404, "Content not found");
            }
            else
                return foundContent;
        }

        public async Task<Content> saveContent(SaveContentRequest content, IFormFile? file)
        {
            Content newContent = new Content();
            newContent.Id = Guid.NewGuid();

            if (file != null)
            {
                string firebaseUploadDir = $"{content.DisciplineId}/{content.TopicId}/{newContent.Id}";
                string fileUrl = await firebaseService.uploadFile(firebaseUploadDir, file.FileName, file.OpenReadStream());
                newContent.Url = fileUrl;
            }

            newContent.Title = content.Title;
            newContent.Description = content.Description;
            newContent.DisciplineId = content.DisciplineId;
            newContent.TopicId = content.TopicId;

            return await contentRepository.saveContent(newContent);
        }

        public async Task deleteContent(Guid id)
        {
            var content = await this.findContentById(id);

            contentRepository.deleteContent(content);
        }

        public async Task<Content> patchContent(Guid id, SaveContentRequest updateContent, IFormFile file)
        {
            var content = await this.findContentById(id);

            if (file != null)
            {
                string firebaseUploadDir = $"{content.DisciplineId}/{content.TopicId}/{id}";
                string fileUrl = await firebaseService.uploadFile(firebaseUploadDir, file.FileName, file.OpenReadStream());
                content.Url = fileUrl;
            }

            content.Title = updateContent.Title;
            content.Description = updateContent.Description;
            content.DisciplineId = updateContent.DisciplineId;
            content.TopicId = updateContent.TopicId;

            return await contentRepository.patchContent(content);
        }
    }
}
