using System;
using System.Threading.Tasks;
using ControleAcademico.Domain.Entities;
namespace ControleAcademico.Domain.Interfaces.Repositories
{
    public interface IEntregarTarefaRepo : IgeralRepo
    {
        Task<EntregarTarefa[]> PegarTodasAsync();
        Task<EntregarTarefa[]> PegarMaterialPorTudoAsync(int IdEntregarTarefa, int IdTarefa, int Matricula, DateTime DataEntrega, string Arquivo);
    }
}