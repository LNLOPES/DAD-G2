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

        private readonly IDisciplinesService disciplineService;
        public DisciplinesController(IDisciplinesService disciplineService)
        {
            this.disciplineService = disciplineService;
        }

        [HttpGet]
        public async Task<IActionResult> getDisciplines()
        {
            return Ok(await this.disciplineService.getDisciplines());
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> findDisciplineById(Guid id)
        {
            return Ok(await this.disciplineService.findDisciplineById(id));
        }

        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public async Task<IActionResult> postDiscipline([FromForm] SaveDisciplineRequest discipline)
        {
            return Created("", await this.disciplineService.saveDiscipline(discipline));
        }

        [Authorize(Roles = "Administrador")]
        [Route("{id}")]
        [HttpPatch]
        public async Task<IActionResult> patchDiscipline([FromRoute] Guid id, [FromForm] SaveDisciplineRequest discipline)
        {
            return Ok(await this.disciplineService.patchDiscipline(id, discipline));
        }

        [Authorize(Roles = "Administrador")]
        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> deleteDiscipline([FromRoute] Guid id)
        {
            await disciplineService.deleteDiscipline(id);

            return NoContent();
        }
    }
}
