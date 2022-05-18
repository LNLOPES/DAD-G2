using Microsoft.AspNetCore.Mvc;
using API_Contents.Models.DTOs;
using API_Contents.Services;

namespace API_Contents.Controllers
{
    // ROLES [ADM, TEACHER, STUDENT]
    [ApiController]
    [Route("[controller]")]
    public class ContentsController : ControllerBase
    {

        private readonly IContentsService contentService;
        public ContentsController(IContentsService contentService)
        {
            this.contentService = contentService;
        }

        [HttpGet]
        public async Task<IActionResult> getContents()
        {
            return Ok(await this.contentService.getContents());
        }

        [Route("Topic/{topicId}")]
        [HttpGet]
        public async Task<IActionResult> findContentsByTopicId(Guid topicId)
        {
            return Ok(await this.contentService.findContentsByTopicId(topicId));
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> findContentById(Guid id)
        {
            return Ok(await this.contentService.findContentById(id));
        }

        [Authorize(Roles = "Administrador,Professor")]
        [HttpPost]
        public async Task<IActionResult> postContent([FromForm] SaveContentRequest content, IFormFile file)
        {
            return Created("", await this.contentService.saveContent(content, file));
        }

        [Authorize(Roles = "Administrador,Professor")]
        [Route("{id}")]
        [HttpPatch]
        public async Task<IActionResult> patchContent([FromRoute] Guid id, [FromForm] SaveContentRequest content, IFormFile file)
        {
            return Ok(await this.contentService.patchContent(id, content, file));
        }

        [Authorize(Roles = "Administrador,Professor")]
        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> deleteContent([FromRoute] Guid id)
        {
            await contentService.deleteContent(id);

            return NoContent();
        }
    }
}
