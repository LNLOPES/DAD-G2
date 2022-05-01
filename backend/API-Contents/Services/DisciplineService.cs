using System.Net;
using API_Contents.Helpers;
using API_Contents.Models.DTOs;
using API_Contents.Models.Entities;
using API_Contents.Repository;

namespace API_Contents.Services
{
    public interface IDisciplinesService
    {
        public Task<List<DisciplineWithStudents>> getDisciplines();
        public Task<DisciplineWithStudents> findDisciplineById(Guid id);
        public Task<DisciplineWithStudents> saveDiscipline(SaveDisciplineRequest topic);
        public Task deleteDiscipline(Guid id);
        public Task<DisciplineWithStudents> patchDiscipline(Guid id, SaveDisciplineRequest topic);
    }

    public class DisciplineService : IDisciplinesService
    {
        private readonly IDisciplinesRepository disciplineRepository;
        public DisciplineService(IDisciplinesRepository disciplineRepository)
        {
            this.disciplineRepository = disciplineRepository;
        }

        public async Task<List<DisciplineWithStudents>> getDisciplines()
        {
            return await disciplineRepository.getDisciplines();
        }

        public async Task<DisciplineWithStudents> findDisciplineById(Guid id)
        {
            DisciplineWithStudents? foundContent = await disciplineRepository.findDisciplineById(id);

            if (foundContent == null)
            {
                throw new HttpException(404, "DisciplineWithStudents not found");
            }

            return foundContent;
              
        }

        public async Task<DisciplineWithStudents> saveDiscipline(SaveDisciplineRequest? DisciplineWithStudents)
        {
            DisciplineWithStudents newDiscipline = new DisciplineWithStudents();
            newDiscipline.Id = Guid.NewGuid();

            newDiscipline.Title = DisciplineWithStudents.Title;
            newDiscipline.Description = DisciplineWithStudents.Description;
            newDiscipline.TeacherId = DisciplineWithStudents.TeacherId;

            return await disciplineRepository.saveDiscipline(newDiscipline);
        }

        public async Task deleteDiscipline(Guid id)
        {
            var DisciplineWithStudents = await this.findDisciplineById(id);

            disciplineRepository.deleteDiscipline(DisciplineWithStudents);
        }

        public async Task<DisciplineWithStudents> patchDiscipline(Guid id, SaveDisciplineRequest updateTopic)
        {
            var DisciplineWithStudents = await this.findDisciplineById(id);


            DisciplineWithStudents.Title = updateTopic.Title;
            DisciplineWithStudents.Description = updateTopic.Description;
            DisciplineWithStudents.TeacherId = updateTopic.TeacherId;

            return await disciplineRepository.patchDiscipline(DisciplineWithStudents);
        }
    }
}
