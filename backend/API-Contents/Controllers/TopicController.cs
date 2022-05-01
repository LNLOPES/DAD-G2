using Microsoft.AspNetCore.Mvc;
using API_Contents.Models.DTOs;
using API_Contents.Services;


namespace API_Contents.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TopicsController : ControllerBase
    {
        private readonly ITopicsService topicService;
        public TopicsController(ITopicsService topicService)
        {
            this.topicService = topicService;
        }

        [HttpGet]
        public async Task<IActionResult> getTopics()
        {
            return Ok(await this.topicService.getTopics());
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> findTopicById(Guid id)
        {
            return Ok(await this.topicService.findTopicById(id));
        }

        [HttpPost]
        public async Task<IActionResult> postTopic([FromForm] SaveTopicRequest topic)
        {
            return Created("", await this.topicService.saveTopic(topic));
        }

        [Route("{id}")]
        [HttpPatch]
        public async Task<IActionResult> patchTopic([FromRoute] Guid id, [FromForm] SaveTopicRequest topic)
        {
            return Ok(await this.topicService.patchTopic(id, topic));
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> deleteTopic([FromRoute] Guid id)
        {
            await topicService.deleteTopic(id);

            return NoContent();
        }
    }
}
