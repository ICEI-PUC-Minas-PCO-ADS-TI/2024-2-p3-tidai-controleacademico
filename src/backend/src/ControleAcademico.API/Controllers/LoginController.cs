using System;
using System.Threading.Tasks;
using ControleAcademico.Domain.Entities;
using ControleAcademico.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
namespace ControleAcademico.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;
        public LoginController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Usuario loginRequest)
        {
            try
            {
                if (string.IsNullOrEmpty(loginRequest.Matricula.ToString()) || string.IsNullOrEmpty(loginRequest.Senha))
                {
                    return BadRequest("Matrícula e senha são obrigatórios.");
                }
                // Busca o usuário com base na matrícula e senha fornecidos
                var usuarios = await _usuarioService.PegarUsuarioPorTudo(
                    matricula: loginRequest.Matricula,
                    senha: loginRequest.Senha
                );
                var usuario = usuarios.FirstOrDefault();
                if (usuario == null)
                {
                    return Unauthorized("Matrícula ou senha inválidos.");
                }
                // Retorna informações básicas do usuário autenticado
                return Ok(new
                {
                    usuario.Matricula,
                    usuario.Nome,
                    usuario.Tipo
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao realizar login: {ex.Message}");
            }
        }
    }
}