using System;
using System.Threading.Tasks;
using ControleAcademico.Domain.Entities;
namespace ControleAcademico.Domain.Interfaces.Repositories
{
    public interface IEntregarTarefaRepo : IgeralRepo
    {
        Task<EntregarTarefa[]> PegarTodasAsync();
        Task<EntregarTarefa[]> PegarMaterialPorTudoAsync(int? IdEntregarTarefa=null, int? IdTarefa=null, int?Matricula=null,  DateTime? DataEntrega=null, string? Arquivo=null, int? Nota=null);
    }
}