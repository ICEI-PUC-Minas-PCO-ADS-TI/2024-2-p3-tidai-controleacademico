 using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleAcademico.Domain.Entities;
using ControleAcademico.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using static ControleAcademico.Domain.Entities.Curso;

namespace ControleAcademico.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DisciplinaController : ControllerBase
    {
        private readonly IDisciplinaService _DisciplinaService;
        public DisciplinaController(IDisciplinaService DisciplinaService)
        {
            _DisciplinaService = DisciplinaService;
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var cursos = await _DisciplinaService.PegarTodosDisciplinaAsynk();
                if (cursos == null) return NoContent();

                return Ok(cursos);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Atividades. Erro: {ex.Message}");
            }
        }


        [HttpPost]
        public async Task<IActionResult> PostCurso(Disciplina model)
        {
            try
            {
                var atividade = await _DisciplinaService.AdicionarDisciplina(model);
                if (atividade == null) return NoContent();

                return Ok(atividade);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar Adicionar Atividades. Erro: {ex.Message}");
            }
        }

[HttpPut("{id}")]
public async Task<IActionResult> PutCurso(int id, Disciplina model)
{
    try
    {
        if (model.IdDisciplinas != id)
            return this.StatusCode(StatusCodes.Status409Conflict,
                "Você está tentando atualizar a atividade errada");

        var atividade = await _DisciplinaService.AtualizarDisciplina(model);
        if (atividade == null) return NoContent();

        return Ok(atividade);
    }
    catch (System.Exception ex)
    {
        return this.StatusCode(StatusCodes.Status500InternalServerError,
            $"Erro ao tentar Atualizar Atividade com id: {id}. Erro: {ex.Message}");
    }
}


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCursos(int id)
        {
            try
            {
                var atividade = await _DisciplinaService.PegarDisciplinaPorTudo(id: id);
                if (atividade == null)
                    this.StatusCode(StatusCodes.Status409Conflict,
                        "Você está tentando deletar a atividade que não existe");

                if (await _DisciplinaService.DeletarDisciplina(id))
                {
                    return Ok(new { message = "Deletado" });
                }
                else
                {
                    return BadRequest("Ocorreu um problema não específico ao tentar deletar a atividade.");
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar Atividade com id: ${id}. Erro: {ex.Message}");
            }
        }
    }
}