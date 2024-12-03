using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleAcademico.Domain.Entities;
using static ControleAcademico.Domain.Entities.Disciplina;
using static ControleAcademico.Domain.Entities.Usuario;
namespace ControleAcademico.Domain.Interfaces.Services
{
    public interface ILoginService
    {
        Task<Usuario> _Login(string matricula, string senha);
    }
}