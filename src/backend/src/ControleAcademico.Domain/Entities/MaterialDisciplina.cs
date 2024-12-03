using System;
using System.Collections.Generic;

namespace ControleAcademico.Domain.Entities;
public partial class MaterialDisciplina
{
    public int IdMateria { get; set; }
    public int? Modulo { get; set; }
    public string? Titulo { get; set; }
    public string? LinkVideoaula { get; set; }
    public string? Descricao { get; set; }
    public int IdDisciplinas { get; set; }
    public string? Img { get; set; } // Nova coluna 'Img'

    public virtual Disciplina? IdDisciplinasNavigation { get; set; } = null!;
}