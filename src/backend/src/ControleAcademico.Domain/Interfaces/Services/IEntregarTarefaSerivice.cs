using System;
using System.Threading.Tasks;
using ControleAcademico.Domain.Entities;
namespace ControleAcademico.Domain.Interfaces.Services
{
    public interface IEntregarTarefaService
    {
        Task<EntregarTarefa> AdicionarEntrega(EntregarTarefa model); // Método para adicionar a entrega
        Task<EntregarTarefa> AtualizarEntrega(EntregarTarefa model);
        Task<bool> DeletarEntrega(int idEntrega);
        Task<EntregarTarefa[]> PegarTodosEntregaAsynk(); // Método para pegar todas as entregas
        Task<EntregarTarefa[]> PegarEntregaPorTudo(int IdEntregarTarefa, int IdTarefa, int Matricula, DateTime DataEntrega, string Arquivo,int Nota); // Método para pegar entregas com filtros
    }
}