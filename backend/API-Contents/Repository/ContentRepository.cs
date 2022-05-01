using API_Contents.Models.DTOs;
using API_Contents.Models.Entities;

namespace API_Contents.Repository
{
    public interface IContentsRepository
    {
        public Task<List<Content>> getContents(Contexto? contexto = null);
        public Task<Content> findContentById(Guid id, Contexto? contexto = null);
        public Task<Content> saveContent(Content content, Contexto? contexto = null);
        public Task<bool> deleteContent(Content content, Contexto? contexto = null);
    }

    public class ContentsRepository : IContentsRepository
    {
        public async Task<Content> findContentById(Guid id, Contexto? contexto = null)
        {
            if (contexto == null)
            {
                contexto = new Contexto();
            }

#pragma warning disable CS8600 // Conversão de literal nula ou possível valor nulo em tipo não anulável.
            Content contentReturn = (from c in contexto.Contents
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

        public async Task<List<Content>> getContents(Contexto? contexto = null)
        {
            if (contexto == null)
            {
                contexto = new Contexto();
            }

            return await Task.FromResult((from c in contexto.Contents
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

        public async Task<Content> saveContent(Content content, Contexto? contexto = null)
        {
            if (contexto == null)
                contexto = new Contexto();

            contexto.Add(content);

            contexto.SaveChanges();

            return await Task.FromResult(content);
        }

        public async Task<bool> deleteContent(Content content, Contexto? contexto = null)
        {
            if (contexto == null)
                contexto = new Contexto();

            contexto.Remove(content);

            contexto.SaveChanges();

            return await Task.FromResult(true);
        }
    }
}
