using API_Contents.Models.DTOs;
using API_Contents.Models.Entities;

namespace API_Contents.Repository
{
    public interface IContentsRepository
    {
        public Task<List<Content>> getContents();
        public Task<Content> findContentById(Guid id);
        public Task<List<Content>> findContentsByTopicId(Guid topicId);
        public Task<Content> saveContent(Content content);
        public void deleteContent(Content content);
        public Task<Content> patchContent(Content content);
    }

    public class ContentsRepository : IContentsRepository
    {
        Contexto contexto;

        public ContentsRepository(Contexto contexto)
        {
            this.contexto = contexto;
        }

        public async Task<Content> findContentById(Guid id)
        {
#pragma warning disable CS8600 // Conversão de literal nula ou possível valor nulo em tipo não anulável.
            Content contentReturn = (from c in this.contexto.Contents
                                     where id == c.Id
                                     select new Content
                                     {
                                         Id = c.Id,
                                         Title = c.Title,
                                         Description = c.Description,
                                         Url = c.Url,
                                         DisciplineId = c.DisciplineId,
                                         TopicId = c.TopicId
                                     }).FirstOrDefault();
#pragma warning restore CS8600 // Conversão de literal nula ou possível valor nulo em tipo não anulável.

            return await Task.FromResult(contentReturn);
        }


        public async Task<List<Content>> findContentsByTopicId(Guid topicId)
        {
#pragma warning disable CS8600 // Conversão de literal nula ou possível valor nulo em tipo não anulável.
            return await Task.FromResult((from c in this.contexto.Contents
                                          where topicId == c.TopicId
                                          select new Content
                                          {
                                              Id = c.Id,
                                              Title = c.Title,
                                              Description = c.Description,
                                              Url = c.Url,
                                              DisciplineId = c.DisciplineId,
                                              TopicId = c.TopicId
                                          }).ToList());
#pragma warning restore CS8600 // Conversão de literal nula ou possível valor nulo em tipo não anulável.

        }

        public async Task<List<Content>> getContents()
        {
            return await Task.FromResult((from c in this.contexto.Contents
                                          select new Content
                                          {
                                              Id = c.Id,
                                              Title = c.Title,
                                              Description = c.Description,
                                              Url = c.Url,
                                              DisciplineId = c.DisciplineId,
                                              TopicId = c.TopicId
                                          }).ToList());
        }

        public async Task<Content> saveContent(Content content)
        {
            this.contexto.Add(content);

            this.contexto.SaveChanges();

            return await Task.FromResult(content);
        }

        public void deleteContent(Content content)
        {
            this.contexto.Contents.Remove(content);

            this.contexto.SaveChanges();
        }

        public async Task<Content> patchContent(Content content)
        {
            this.contexto.Update(content);

            this.contexto.SaveChanges();

            return await Task.FromResult(content);
        }
    }
}
