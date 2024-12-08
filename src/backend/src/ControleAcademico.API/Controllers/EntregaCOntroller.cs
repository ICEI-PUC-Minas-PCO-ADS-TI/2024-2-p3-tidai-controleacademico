using System;
using System.Threading.Tasks;
using ControleAcademico.Domain.Entities;
using ControleAcademico.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Http;
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

        [HttpPost]
        public async Task<IActionResult> PostEntrega([FromBody] EntregarTarefa model)
        {
            try
            {
                if (model == null)
                    return BadRequest("Modelo de entrega inválido.");

                var entrega = await _entregarTarefaService.AdicionarEntrega(model);
                return CreatedAtAction(nameof(PostEntrega), new { entrega.IdEntrega }, entrega);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao adicionar entrega de tarefa. Detalhes: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var entregas = await _entregarTarefaService.PegarTodosEntregaAsynk();
                if (entregas == null || entregas.Length == 0)
                    return NoContent();

                return Ok(entregas);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao recuperar entregas de tarefa. Detalhes: {ex.Message}");
            }
        }

        [HttpGet("filtradas")]
        public async Task<IActionResult> GetEntregaFiltrada(
            [FromQuery] int IdEntregarTarefa,
            [FromQuery] int IdTarefa,
            [FromQuery] int Matricula,
            [FromQuery] DateTime DataEntrega,
            [FromQuery] string Arquivo,
            [FromQuery] int Nota)
        {
            try
            {
                var entregas = await _entregarTarefaService.PegarEntregaPorTudo(IdEntregarTarefa, IdTarefa, Matricula, DataEntrega, Arquivo, Nota);
                if (entregas == null || entregas.Length == 0)
                    return NoContent();

                return Ok(entregas);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao filtrar entregas de tarefa. Detalhes: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntrega(int id, [FromBody] EntregarTarefa model)
        {
            try
            {
                if (model == null || model.IdEntrega != id)
                    return BadRequest("Dados inválidos para atualização.");

                var entregaAtualizada = await _entregarTarefaService.AtualizarEntrega(model);
                if (entregaAtualizada == null)
                    return NotFound("Entrega de tarefa não encontrada.");

                return Ok(entregaAtualizada);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao atualizar entrega de tarefa. Detalhes: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntrega(int id)
        {
            try
            {
                var sucesso = await _entregarTarefaService.DeletarEntrega(id);
                if (!sucesso)
                    return NotFound("Entrega de tarefa não encontrada.");

                return Ok("Entrega de tarefa deletada com sucesso.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao deletar entrega de tarefa. Detalhes: {ex.Message}");
            }
        }
    }
}
