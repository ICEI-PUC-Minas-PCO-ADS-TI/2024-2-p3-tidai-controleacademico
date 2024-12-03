using System;
using System.Threading.Tasks;
using ControleAcademico.Domain.Entities;
using ControleAcademico.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
namespace ControleAcademico.API.Controllers
{
[ApiController]
[Route("api/[controller]")]
public class EntregarTarefaController : ControllerBase
{
    private readonly IEntregarTarefaService _entregarTarefaService;
    public EntregarTarefaController(IEntregarTarefaService entregarTarefaService)
    {
        _entregarTarefaService = entregarTarefaService;
    }
        // Endpoint para adicionar uma entrega de tarefa
        [HttpPost]
        public async Task<IActionResult> PostEntrega(EntregarTarefa model)
        {
            try
            {
                var entrega = await _entregarTarefaService.AdicionarEntrega(model);
                if (entrega == null) return NoContent();
                return Ok(entrega);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao adicionar entrega de tarefa. Erro: {ex.Message}");
            }
        }
        // Endpoint para pegar todas as entregas de tarefa
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var entregas = await _entregarTarefaService.PegarTodosEntregaAsynk();
                if (entregas == null || entregas.Length == 0) return NoContent();
                return Ok(entregas);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao recuperar entregas de tarefa. Erro: {ex.Message}");
            }
        }
        // Endpoint para pegar entregas de tarefa filtradas
        [HttpGet("filtradas")]
        public async Task<IActionResult> GetEntregaFiltrada(int IdEntregarTarefa, int IdTarefa, int Matricula, DateTime DataEntrega, string Arquivo)
        {
            try
            {
                var entregas = await _entregarTarefaService.PegarEntregaPorTudo(IdEntregarTarefa, IdTarefa, Matricula, DataEntrega, Arquivo);
                if (entregas == null || entregas.Length == 0) return NoContent();
                return Ok(entregas);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao filtrar entregas de tarefa. Erro: {ex.Message}");
            }
        }
    }
}