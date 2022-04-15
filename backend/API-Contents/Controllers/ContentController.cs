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

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> findContentById(Guid id)
        {
            return Ok(await this.contentService.findContentById(id));
        }

        [HttpPost]
        public async Task<IActionResult> postContent([FromForm] SaveContentRequest content, IFormFile file)
        {
            return Created("", await this.contentService.saveContent(content, file));
        }

        [Route("{id}")]
        [HttpPatch]
        public async Task<IActionResult> patchContent([FromRoute] Guid id, [FromForm] SaveContentRequest content, IFormFile file)
        {
            return NoContent();
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> deleteContent([FromRoute] Guid id)
        {
            return NoContent();
            //return Created("", await this.contentService.saveContent(content, file));
        }
    }
}
