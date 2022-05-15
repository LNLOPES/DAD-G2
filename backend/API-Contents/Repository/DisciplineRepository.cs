using API_Contents.Models.DTOs;
using API_Contents.Models.Entities;

namespace API_Contents.Repository
{
    public interface IDisciplinesRepository
    {
        public Task<List<DisciplineWithStudents>> getDisciplines();
        public Task<DisciplineWithStudents> findDisciplineById(Guid id);
        public Task<DisciplineWithStudents> saveDiscipline(DisciplineWithStudents discipline);
        public void deleteDiscipline(DisciplineWithStudents discipline);
        public Task<DisciplineWithStudents> patchDiscipline(DisciplineWithStudents discipline);
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
                                                           TeacherId = d.TeacherId
                                                       }).FirstOrDefault();
#pragma warning restore CS8600 // Conversão de literal nula ou possível valor nulo em tipo não anulável.

            disciplineReturn.StudentsIds = (from ds in this.contexto.DisciplineStudents
                                                            where ds.DisciplineId == disciplineReturn.Id
                                                            select ds.StudentsIds).ToList();

            return await Task.FromResult(disciplineReturn);
        }

        public async Task<List<DisciplineWithStudents>> getDisciplines()
        {
            var retorno = await Task.FromResult((from d in this.contexto.Disciplines
                                                 select new DisciplineWithStudents
                                                 {
                                                     Id = d.Id,
                                                     Title = d.Title,
                                                     Description = d.Description,
                                                     TeacherId = d.TeacherId
                                                 }).ToList());
            foreach(var d in retorno)
            {
                d.StudentsIds = (from ds in this.contexto.DisciplineStudents
                                               where ds.DisciplineId == d.Id
                                               select ds.StudentsIds).ToList();
            }


            return retorno;
        }

        public async Task<DisciplineWithStudents> saveDiscipline(DisciplineWithStudents discipline)
        {
            DisciplineStudent disciplineStudent = new DisciplineStudent();
            disciplineStudent.DisciplineId = discipline.Id;

            if(discipline.StudentsIds != null && discipline.StudentsIds.Count > 0)
            {
                foreach (var i in discipline.StudentsIds)
                {
                    disciplineStudent.StudentsIds = i;
                    this.contexto.Add(disciplineStudent);
                    this.contexto.SaveChanges();

                }
            }
           
            
            this.contexto.Add(discipline);
            this.contexto.SaveChanges();

            return await Task.FromResult(discipline);
        }

        

        public void deleteDiscipline(DisciplineWithStudents discipline)
        {
            this.contexto.Remove(discipline);

            this.contexto.SaveChanges();
        }

        public async Task<DisciplineWithStudents> patchDiscipline(DisciplineWithStudents discipline)
        {
            this.contexto.Update(discipline);

            this.contexto.SaveChanges();

            return await Task.FromResult(discipline);
        }
    }
}
