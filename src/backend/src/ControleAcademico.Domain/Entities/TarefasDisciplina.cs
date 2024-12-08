using System;
using System.Collections.Generic;

namespace ControleAcademico.Domain.Entities;
public partial class TarefasDisciplina
{
    public int IdTarefa { get; set; }
    public string? Modulo { get; set; }
    public string? Titulo { get; set; }
    public int? Valor { get; set; }
    public DateOnly? DataEntrega { get; set; }
    public string? LinkArquivoTarefa { get; set; }
    public int IdDisciplinas { get; set; }

    public virtual Disciplina? IdDisciplinasNavigation { get; set; } = null!;
    public virtual ICollection<EntregarTarefa> EntregarTarefas { get; set; } // Relacionamento com EntregarTarefa
}
