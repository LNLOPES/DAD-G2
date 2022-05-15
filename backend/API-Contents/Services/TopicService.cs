using System.Net;
using API_Contents.Helpers;
using API_Contents.Models.DTOs;
using API_Contents.Models.Entities;
using API_Contents.Repository;

namespace API_Contents.Services
{
    public interface ITopicsService
    {
        public Task<List<Topic>> getTopics();
        public Task<Topic> findTopicById(Guid id);
        public Task<Topic> saveTopic(SaveTopicRequest topic);
        public Task deleteTopic(Guid id);
        public Task<Topic> patchTopic(Guid id, SaveTopicRequest topic);
    }

    public class TopicService : ITopicsService
    {
        private readonly ITopicsRepository topicRepository;
        public TopicService(ITopicsRepository topicRepository)
        {
            this.topicRepository = topicRepository;
        }

        public async Task<List<Topic>> getTopics()
        {
            return await topicRepository.getTopics();
        }

        public async Task<Topic> findTopicById(Guid id)
        {
            Topic? foundContent = await topicRepository.findTopicById(id);

            if (foundContent == null)
            {
                throw new HttpException(404, "Topic not found");
            }
            
            return foundContent;
            
                
        }

        public async Task<Topic> saveTopic(SaveTopicRequest? Topic)
        {
            Topic newTopic = new Topic();
            newTopic.Id = Guid.NewGuid();

            newTopic.Title = Topic.Title;
            newTopic.Description = Topic.Description;
            newTopic.DisciplineId = Topic.DisciplineId;

            return await topicRepository.saveTopic(newTopic);
        }

        public async Task deleteTopic(Guid id)
        {
            var Topic = await this.findTopicById(id);

            topicRepository.deleteTopic(Topic);
        }

        public async Task<Topic> patchTopic(Guid id, SaveTopicRequest updateTopic)
        {
            var Topic = await this.findTopicById(id);


            Topic.Title = updateTopic.Title;
            Topic.Description = updateTopic.Description;
            Topic.DisciplineId = updateTopic.DisciplineId;

            return await topicRepository.patchTopic(Topic);
        }
    }
}
