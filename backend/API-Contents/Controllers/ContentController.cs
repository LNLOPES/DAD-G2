using Microsoft.AspNetCore.Mvc;
using API_Contents.Models.DTOs;
using API_Contents.Services;

namespace API_Contents.Controllers
{
    // ROLES [ADM, TEACHER, STUDENT]
    [ApiController]
    [Route("[controller]")]
    public class ContentController : ControllerBase
    {

        private readonly IContentsService contentService;
        public ContentController(IContentsService contentService)
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
    }
}
