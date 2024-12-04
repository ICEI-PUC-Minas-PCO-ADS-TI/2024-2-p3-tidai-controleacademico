using System;
using System.Collections.Generic;

namespace ControleAcademico.Domain.Entities;

public partial class Curso
{
    public int IdCursos { get; set; }
    public string? Nome { get; set; }
    public Niveis? Nivel { get; set; }
    public TiposCurso? Tipo { get; set; }

    public virtual ICollection<Disciplina> Disciplinas { get; set; } = new List<Disciplina>();
    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();

    public enum TiposCurso
    {
        Presencial,
        Ead,
        Misto,
    }
    public enum Niveis
    {
        Graduação,
        PósGraduação,
        Doutorado,
        Mestrado,
    }
}
