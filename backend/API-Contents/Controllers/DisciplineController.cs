using Microsoft.AspNetCore.Mvc;
using API_Contents.Models.DTOs;
using API_Contents.Services;

namespace API_Contents.Controllers
{
    // ROLES [ADM, TEACHER, STUDENT]
    [ApiController]
    [Route("[controller]")]
    public class DisciplinesController : ControllerBase
    {

        //private readonly IContentsService contentService;
        public DisciplinesController(IContentsService contentService)
        {
            //this.contentService = contentService;
        }

        [HttpGet]
        public async Task<IActionResult> getDisciplines()
        {
            return Ok();
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> findDisciplineById(Guid id)
        {
            return Ok();
        }

        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public async Task<IActionResult> postDiscipline(SaveDisciplineRequest discipline)
        {
            return Created("", discipline);
        }

        [Authorize(Roles = "Administrador")]
        [Route("{id}")]
        [HttpPatch]
        public async Task<IActionResult> patchDiscipline([FromRoute] Guid id, SaveDisciplineRequest discipline)
        {
            return NoContent();
        }

        [Authorize(Roles = "Administrador")]
        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> deleteDiscipline([FromRoute] Guid id)
        {
            return NoContent();
        }
    }
}
