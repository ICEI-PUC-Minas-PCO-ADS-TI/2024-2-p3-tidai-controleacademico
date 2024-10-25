﻿using System;
using System.Collections.Generic;

namespace ControleAcademico.API.Model;
public partial class DisciplinasUsuario
{
    public int Matricula { get; set; }

    public int IdDisciplinas { get; set; }

    public virtual Disciplina IdDisciplinasNavigation { get; set; } = null!;

    public virtual Usuario MatriculaNavigation { get; set; } = null!;
}
