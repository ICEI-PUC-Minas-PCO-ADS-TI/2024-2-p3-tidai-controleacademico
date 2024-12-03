using System;
using System.Collections.Generic;

namespace ControleAcademico.Domain.Entities;
public partial class Usuario
{
    public int Matricula { get; set; }
    public string? Nome { get; set; }
    public string? Cpf { get; set; }
    public string? Email { get; set; }
    public string? Endereco { get; set; }
    public Tipos Tipo { get; set; }
    public string? Senha { get; set; }
    public int IdCurso { get; set; }

    public virtual Curso? IdCursoNavigation { get; set; } = null!;
    public virtual ICollection<NotasTarefa> NotasTarefas { get; set; } = new List<NotasTarefa>();
    public virtual ICollection<DisciplinasUsuario> DisciplinasUsuarios { get; set; } = new HashSet<DisciplinasUsuario>();
    public virtual ICollection<EntregarTarefa> EntregarTarefas { get; set; } // Relacionamento com EntregarTarefa

    public enum Tipos
    {
        Aluno,
        Professor,
        Secretário
    }
}



