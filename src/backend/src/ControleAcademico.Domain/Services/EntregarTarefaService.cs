using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleAcademico.Domain.Entities;
using ControleAcademico.Domain.Interfaces.Repositories;
using ControleAcademico.Domain.Interfaces.Services;
using static ControleAcademico.Domain.Entities.Curso;
namespace ControleAcademico.Domain.Services
{
    public class EntregarTarefaService : IEntregarTarefaService
        {
        private readonly IEntregarTarefaRepo _entregaRepo;
        public EntregarTarefaService(IEntregarTarefaRepo cursoRepo)
        {
            this._entregaRepo = cursoRepo;
        }
        public async Task<EntregarTarefa> AdicionarEntrega(EntregarTarefa model)
        {
            // Adiciona o novo curso
            _entregaRepo.Adicionar(model);
            if (await _entregaRepo.SalvarMudancaAsync())
                return model;
            throw new Exception("Erro ao salvar.");
        }
        public async Task<EntregarTarefa[]> PegarTodosEntregaAsynk()
        {
            try
            {
                var entrega = await _entregaRepo.PegarTodasAsync();
                if (entrega == null) return null;
                return entrega;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<EntregarTarefa[]> PegarEntregaPorTudo(int IdEntregarTarefa, int IdTarefa, int Matricula, DateTime DataEntrega, string Arquivo)
        {
            try
            {
                var entrega = await _entregaRepo.PegarMaterialPorTudoAsync(IdEntregarTarefa, IdTarefa, Matricula, DataEntrega, Arquivo);
                if (entrega == null) return null;
                return entrega;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}