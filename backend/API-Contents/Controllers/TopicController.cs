using Microsoft.AspNetCore.Mvc;
using API_Contents.Models.DTOs;
using API_Contents.Services;


namespace API_Contents.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TopicsController : ControllerBase
    {
        public TopicsController(IContentsService contentService)
        {
            //this.contentService = contentService;
        }

        [HttpGet]
        public async Task<IActionResult> getTopics()
        {
            return Ok();
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> findDisciplineById(Guid id)
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> postDiscipline(SaveTopicRequest topic)
        {
            return Created("", topic);
        }

        [Route("{id}")]
        [HttpPatch]
        public async Task<IActionResult> patchDiscipline([FromRoute] Guid id, SaveTopicRequest topic)
        {
            return NoContent();
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> deleteDiscipline([FromRoute] Guid id)
        {
            return NoContent();
        }
    }
}
