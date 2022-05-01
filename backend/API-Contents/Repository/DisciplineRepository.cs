using API_Contents.Models.DTOs;
using API_Contents.Models.Entities;

namespace API_Contents.Repository
{
    public interface IDisciplinesRepository
    {
        public Task<List<DisciplineWithStudents>> getDisciplines();
        public Task<DisciplineWithStudents> findDisciplineById(Guid id);
        public Task<DisciplineWithStudents> saveDiscipline(Discipline discipline);
        public void deleteDiscipline(DisciplineWithStudents discipline);
        public Task<DisciplineWithStudents> patchDiscipline(Discipline discipline);
    }

    public class DisciplinesRepository : IDisciplinesRepository
    {
        Contexto contexto;

        public DisciplinesRepository(Contexto contexto)
        {
            this.contexto = contexto;
        }

        public async Task<DisciplineWithStudents> findDisciplineById(Guid id)
        {
#pragma warning disable CS8600 // Conversão de literal nula ou possível valor nulo em tipo não anulável.
            DisciplineWithStudents disciplineReturn = (from d in this.contexto.Disciplines
                                                       where id == d.Id
                                                       select new DisciplineWithStudents
                                                       {
                                                           Id = d.Id,
                                                           Title = d.Title,
                                                           Description = d.Description,
                                                           TeacherId = d.TeacherId,
                                                           StudentsIds = (from ds in this.contexto.DisciplineStudents
                                                                          where ds.DisciplineId == d.Id
                                                                          select ds.StudentsIds).ToArray()
                                                       }).FirstOrDefault();
#pragma warning restore CS8600 // Conversão de literal nula ou possível valor nulo em tipo não anulável.

            return await Task.FromResult(disciplineReturn);
        }

        public async Task<List<DisciplineWithStudents>> getDisciplines()
        {
            return await Task.FromResult((from d in this.contexto.Disciplines
                                          select new DisciplineWithStudents
                                          {
                                              Id = d.Id,
                                              Title = d.Title,
                                              Description = d.Description,
                                              TeacherId = d.TeacherId,
                                              StudentsIds = (from ds in this.contexto.DisciplineStudents
                                                             where ds.DisciplineId == d.Id
                                                             select ds.StudentsIds).ToArray()
                                          }).ToList());
        }

        public async Task<DisciplineWithStudents> saveDiscipline(DisciplineWithStudents disciplineStudent, Discipline discipline)
        {
            this.contexto.Add(disciplineStudent);
            this.contexto.Add(discipline);

            this.contexto.SaveChanges();

            return await Task.FromResult(disciplineStudent);
        }

        

        public void deleteDiscipline(DisciplineWithStudents discipline)
        {
            this.contexto.Remove(discipline);

            this.contexto.SaveChanges();
        }

        public async Task<DisciplineWithStudents> patchDiscipline(Discipline discipline)
        {
            this.contexto.Update(discipline);

            this.contexto.SaveChanges();

            return await Task.FromResult(discipline);
        }
    }
}
