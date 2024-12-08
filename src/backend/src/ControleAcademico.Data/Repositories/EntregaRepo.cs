using ControleAcademico.Data.Context;
using ControleAcademico.Domain.Entities;
using ControleAcademico.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
namespace ControleAcademico.Data.Repositories
{
    public class EntregarTarefaRepo : GeralRepo, IEntregarTarefaRepo
    {
        private readonly ControleAcademicoContext _context;
        public EntregarTarefaRepo(ControleAcademicoContext context) : base(context)
        {
            _context = context;
        }
        // Método para pegar todas as entregas de tarefa
        public async Task<EntregarTarefa[]> PegarTodasAsync()
        {
            return await _context.EntregarTarefas.AsNoTracking().ToArrayAsync();
        }
        // Método para pegar entregas de tarefa com filtros
        public async Task<EntregarTarefa[]> PegarMaterialPorTudoAsync(int IdEntrega, int IdTarefa, int Matricula,  DateTime DataEntrega, string Arquivo,int Nota)
        {
            IQueryable<EntregarTarefa> query = _context.EntregarTarefas.AsNoTracking();
            // Aplicando filtros dinamicamente
            if (IdEntrega > 0)
                query = query.Where(m => m.IdEntrega == IdEntrega);
            if (IdTarefa > 0)
                query = query.Where(m => m.IdTarefa == IdTarefa);
            if (Matricula > 0)
                query = query.Where(m => m.Matricula == Matricula);
            if (Nota > 0)
                query = query.Where(m => m.Nota == Nota);
            if (DataEntrega != default)
                query = query.Where(m => m.DataEntrega == DataEntrega);
            if (!string.IsNullOrWhiteSpace(Arquivo))
                query = query.Where(m => m.Arquivo.Contains(Arquivo));
            return await query.ToArrayAsync();
        }
    }
}