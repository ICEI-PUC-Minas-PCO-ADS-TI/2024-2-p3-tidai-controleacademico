using System;
using System.Collections.Generic;

namespace ControleAcademico.Domain.Entities;
public class EntregarTarefa
{
    public int? IdEntrega { get; set; }
    public int? IdTarefa { get; set; }
    public int? Matricula { get; set; }
    public DateTime? DataEntrega { get; set; }
    public string Arquivo { get; set; }

    public virtual TarefasDisciplina? IdTarefaNavigation { get; set; }
    public virtual Usuario? MatriculaNavigation { get; set; }
}
