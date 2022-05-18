using API_Contents.Models.DTOs;
using API_Contents.Models.Entities;

namespace API_Contents.Repository
{
    public interface ITopicsRepository
    {
        public Task<List<Topic>> getTopics();
        public Task<Topic> findTopicById(Guid id);
        public Task<List<Topic>> findTopicsByDisciplineId(Guid disciplineId);
        public Task<Topic> saveTopic(Topic topic);
        public void deleteTopic(Topic topic);
        public Task<Topic> patchTopic(Topic topic);
    }

    public class TopicsRepository : ITopicsRepository
    {
        Contexto contexto;

        public TopicsRepository(Contexto contexto)
        {
            this.contexto = contexto;
        }

        public async Task<Topic> findTopicById(Guid id)
        {
#pragma warning disable CS8600 // Conversão de literal nula ou possível valor nulo em tipo não anulável.
            Topic topicReturn = (from t in this.contexto.Topics
                                     where id == t.Id
                                     select new Topic
                                     {
                                         Id = t.Id,
                                         Title = t.Title,
                                         Description = t.Description,
                                         DisciplineId = t.DisciplineId
                                     }).FirstOrDefault();
#pragma warning restore CS8600 // Conversão de literal nula ou possível valor nulo em tipo não anulável.

            return await Task.FromResult(topicReturn);
        }

        public async Task<List<Topic>> findTopicsByDisciplineId(Guid disciplineId)
        {
#pragma warning disable CS8600 // Conversão de literal nula ou possível valor nulo em tipo não anulável.
            return await Task.FromResult((from t in this.contexto.Topics
                                 where disciplineId == t.DisciplineId
                                 select new Topic
                                 {
                                     Id = t.Id,
                                     Title = t.Title,
                                     Description = t.Description,
                                     DisciplineId = t.DisciplineId
                                 }).ToList());
#pragma warning restore CS8600 // Conversão de literal nula ou possível valor nulo em tipo não anulável.

        }

        public async Task<List<Topic>> getTopics()
        {
            return await Task.FromResult((from t in this.contexto.Topics
                                          select new Topic
                                          {
                                              Id = t.Id,
                                              Title = t.Title,
                                              Description = t.Description,
                                              DisciplineId = t.DisciplineId
                                          }).ToList());
        }

        public async Task<Topic> saveTopic(Topic topic)
        {
            this.contexto.Add(topic);

            this.contexto.SaveChanges();

            return await Task.FromResult(topic);
        }

        public void deleteTopic(Topic topic)
        {
            this.contexto.Remove(topic);

            this.contexto.SaveChanges();
        }

        public async Task<Topic> patchTopic(Topic topic)
        {
            this.contexto.Update(topic);

            this.contexto.SaveChanges();

            return await Task.FromResult(topic);
        }
    }
}
