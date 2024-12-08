using System;
using System.Linq;
using System.Threading.Tasks;
using ControleAcademico.Domain.Entities;
using ControleAcademico.Domain.Interfaces.Repositories;
using ControleAcademico.Domain.Interfaces.Services;

namespace ControleAcademico.Domain.Services
{
    public class EntregarTarefaService : IEntregarTarefaService
    {
        private readonly IEntregarTarefaRepo _entregaRepo;

        public EntregarTarefaService(IEntregarTarefaRepo entregaRepo)
        {
            this._entregaRepo = entregaRepo;
        }

        public async Task<EntregarTarefa> AdicionarEntrega(EntregarTarefa model)
        {
            _entregaRepo.Adicionar(model);
            if (await _entregaRepo.SalvarMudancaAsync())
                return model;

            throw new Exception("Erro ao salvar a entrega.");
        }

        public async Task<EntregarTarefa> AtualizarEntrega(EntregarTarefa model)
        {
            // Verifica se o ID da entrega é válido
            if (model.IdEntrega <= 0)
                throw new ArgumentException("ID da entrega é inválido.");

            // Atualiza os dados da entrega
            _entregaRepo.Atualizar(model);
            if (await _entregaRepo.SalvarMudancaAsync())
                return model;

            throw new Exception("Erro ao atualizar a entrega.");
        }

        public async Task<bool> DeletarEntrega(int idEntrega)
        {
            // Busca a entrega utilizando o filtro completo
            var entregas = await _entregaRepo.PegarMaterialPorTudoAsync(idEntrega, 0, 0, default, null, 0);
            if (entregas == null || !entregas.Any())
                throw new Exception("Entrega que tentou deletar não existe.");

            var entrega = entregas.FirstOrDefault();
            _entregaRepo.Deletar(entrega);

            return await _entregaRepo.SalvarMudancaAsync();
        }

        public async Task<EntregarTarefa[]> PegarTodosEntregaAsynk()
        {
            try
            {
                var entregas = await _entregaRepo.PegarTodasAsync();
                if (entregas == null || !entregas.Any())
                    return null;

                return entregas;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao buscar todas as entregas: {ex.Message}");
            }
        }

        public async Task<EntregarTarefa[]> PegarEntregaPorTudo(int IdEntregarTarefa, int IdTarefa, int Matricula, DateTime DataEntrega, string Arquivo, int Nota)
        {
            try
            {
                var entregas = await _entregaRepo.PegarMaterialPorTudoAsync(IdEntregarTarefa, IdTarefa, Matricula, DataEntrega, Arquivo, Nota);
                if (entregas == null || !entregas.Any())
                    return null;

                return entregas;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao buscar entrega por critérios: {ex.Message}");
            }
        }
    }
}
