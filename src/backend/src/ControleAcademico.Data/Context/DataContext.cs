using System;
using System.Collections.Generic;
using ControleAcademico.Domain.Entities;
using Microsoft.EntityFrameworkCore;
namespace ControleAcademico.Data.Context;

public partial class ControleAcademicoContext : DbContext
{
    public ControleAcademicoContext() { }
    public ControleAcademicoContext(DbContextOptions<ControleAcademicoContext> options) : base(options) { }

    public virtual DbSet<Curso> Cursos { get; set; }
    public virtual DbSet<Disciplina> Disciplinas { get; set; }
    public virtual DbSet<DisciplinasUsuario> DisciplinasUsuarios { get; set; }
    public virtual DbSet<MaterialDisciplina> MaterialDisciplinas { get; set; }
    public virtual DbSet<NotasTarefa> NotasTarefas { get; set; }
    public virtual DbSet<Presenca> Presencas { get; set; }
    public virtual DbSet<TarefasDisciplina> TarefasDisciplinas { get; set; }
    public virtual DbSet<Usuario> Usuarios { get; set; }
    public virtual DbSet<EntregarTarefa> EntregarTarefas { get; set; } // Tabela nova

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseMySql("server=localhost;database=controleacademicologin;user=root;password=2470", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.36-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb3_general_ci")
            .HasCharSet("utf8mb3");

        modelBuilder.Entity<Curso>(entity =>
        {
            entity.HasKey(e => e.IdCursos).HasName("PRIMARY");
            entity.ToTable("cursos");
            entity.Property(e => e.IdCursos).ValueGeneratedNever().HasColumnName("id_cursos");
            entity.Property(e => e.Nivel).HasColumnName("nivel");
            entity.Property(e => e.Nome).HasMaxLength(45).HasColumnName("nome");
            entity.Property(e => e.Tipo).HasColumnName("tipo");
        });

        modelBuilder.Entity<Disciplina>(entity =>
        {
            entity.HasKey(e => e.IdDisciplinas).HasName("PRIMARY");
            entity.ToTable("disciplinas");
            entity.HasIndex(e => e.IdCurso, "fk_disciplinas_cursos");
            entity.Property(e => e.IdDisciplinas).ValueGeneratedNever().HasColumnName("id_disciplinas");
            entity.Property(e => e.IdCurso).HasColumnName("id_curso");
            entity.Property(e => e.Nome).HasMaxLength(45).HasColumnName("nome");
            entity.Property(e => e.Semestre).HasColumnName("semestre");
            entity.HasOne(d => d.IdCursoNavigation).WithMany(p => p.Disciplinas)
                .HasForeignKey(d => d.IdCurso)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_disciplinas_cursos");
        });

        modelBuilder.Entity<DisciplinasUsuario>(entity =>
        {
            entity.HasKey(e => new { e.Matricula, e.IdDisciplinas }).HasName("PRIMARY");
            entity.ToTable("disciplinas_usuario");
            entity.HasIndex(e => e.IdDisciplinas, "fk_disciplinas_usuario_disciplinas");
            entity.HasIndex(e => e.Matricula, "fk_disciplinas_usuario_usuarios");
            entity.Property(e => e.IdDisciplinas).HasColumnName("id_disciplinas");
            entity.Property(e => e.Matricula).HasColumnName("matricula");
            entity.HasOne(d => d.IdDisciplinasNavigation)
                .WithMany(p => p.DisciplinasUsuarios)
                .HasForeignKey(d => d.IdDisciplinas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_disciplinas_usuario_disciplinas");

            entity.HasOne(d => d.MatriculaNavigation)
                .WithMany(p => p.DisciplinasUsuarios)
                .HasForeignKey(d => d.Matricula)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_disciplinas_usuario_usuarios");
        });

        modelBuilder.Entity<MaterialDisciplina>(entity =>
        {
            entity.HasKey(e => e.IdMateria).HasName("PRIMARY");
            entity.ToTable("material_disciplina");
            entity.HasIndex(e => e.IdDisciplinas, "fk_material_disciplina_disciplinas");
            entity.Property(e => e.IdMateria).ValueGeneratedNever().HasColumnName("id_materia");
            entity.Property(e => e.Descricao).HasMaxLength(255).HasColumnName("descricao");
            entity.Property(e => e.IdDisciplinas).HasColumnName("id_disciplinas");
            entity.Property(e => e.LinkVideoaula).HasMaxLength(1000).HasColumnName("link_videoaula");
            entity.Property(e => e.Modulo).HasColumnName("modulo");
            entity.Property(e => e.Titulo).HasMaxLength(45).HasColumnName("titulo");
            entity.Property(e => e.Img).HasMaxLength(1000).HasColumnName("img"); // Nova coluna 'img'

            entity.HasOne(d => d.IdDisciplinasNavigation)
                .WithMany(p => p.MaterialDisciplinas)
                .HasForeignKey(d => d.IdDisciplinas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_material_disciplina_disciplinas");
        });

        modelBuilder.Entity<NotasTarefa>(entity =>
        {
            entity.HasKey(e => new { e.Matricula, e.IdTarefa }).HasName("PRIMARY");
            entity.ToTable("notas_tarefas");
            entity.HasIndex(e => e.IdTarefa, "fk_notas_tarefas_tarefas_disciplina");
            entity.Property(e => e.Matricula).HasColumnName("matricula");
            entity.Property(e => e.IdTarefa).HasColumnName("id_tarefa");
            entity.Property(e => e.Nota).HasColumnName("nota");
            entity.HasOne(d => d.IdTarefaNavigation)
                .WithMany(p => p.NotasTarefas)
                .HasForeignKey(d => d.IdTarefa)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_notas_tarefas_tarefas_disciplina");

            entity.HasOne(d => d.MatriculaNavigation)
                .WithMany(p => p.NotasTarefas)
                .HasForeignKey(d => d.Matricula)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_notas_tarefas_usuarios");
        });

        modelBuilder.Entity<Presenca>(entity =>
        {
            entity.HasKey(e => e.IdPresenca).HasName("PRIMARY");
            entity.ToTable("presenca");
            entity.HasIndex(e => e.IdDisciplinasUsuario, "fk_presenca_disciplinas_usuario");
            entity.Property(e => e.IdPresenca).HasColumnName("id_presenca");
            entity.Property(e => e.Data).HasColumnName("data");
            entity.Property(e => e.IdDisciplinasUsuario).HasColumnName("id_disciplinas_usuario");
            entity.Property(e => e.Presenca1).HasColumnName("presenca");
        });

        modelBuilder.Entity<TarefasDisciplina>(entity =>
        {
            entity.HasKey(e => e.IdTarefa).HasName("PRIMARY");
            entity.ToTable("tarefas_disciplina");
            entity.HasIndex(e => e.IdDisciplinas, "fk_tarefas_disciplinas");
            entity.Property(e => e.IdTarefa).ValueGeneratedNever().HasColumnName("Id_tarefa");
            entity.Property(e => e.DataEntrega).HasColumnName("data_entrega");
            entity.Property(e => e.IdDisciplinas).HasColumnName("id_disciplinas");
            entity.Property(e => e.LinkArquivoTarefa).HasMaxLength(1000).HasColumnName("link_arquivo_tarefa");
            entity.Property(e => e.Modulo).HasMaxLength(45).HasColumnName("modulo");
            entity.Property(e => e.Titulo).HasMaxLength(45).HasColumnName("titulo");
            entity.Property(e => e.Valor).HasColumnName("valor");

            entity.HasOne(d => d.IdDisciplinasNavigation)
                .WithMany(p => p.TarefasDisciplinas)
                .HasForeignKey(d => d.IdDisciplinas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_tarefas_disciplinas");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Matricula).HasName("PRIMARY");
            entity.ToTable("usuarios");
            entity.HasIndex(e => e.IdCurso, "fk_usuarios_cursos");
            entity.Property(e => e.Matricula).ValueGeneratedNever().HasColumnName("matricula");
            entity.Property(e => e.Cpf).HasMaxLength(11).HasColumnName("cpf");
            entity.Property(e => e.Email).HasMaxLength(45).HasColumnName("email");
            entity.Property(e => e.Endereco).HasMaxLength(45).HasColumnName("endereco");
            entity.Property(e => e.IdCurso).HasColumnName("id_curso");
            entity.Property(e => e.Nome).HasMaxLength(45).HasColumnName("nome");
            entity.Property(e => e.Senha).HasMaxLength(45).HasColumnName("senha");
            entity.Property(e => e.Tipo).HasColumnName("tipo");

            entity.HasOne(d => d.IdCursoNavigation)
                .WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.IdCurso)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_usuarios_cursos");
        });

        // Nova tabela EntregarTarefa
        modelBuilder.Entity<EntregarTarefa>(entity =>
        {
            entity.HasKey(e => e.IdEntrega).HasName("PRIMARY");
            entity.ToTable("entregar_tarefa");
            entity.Property(e => e.IdEntrega).HasColumnName("id_entrega");
            entity.Property(e => e.IdTarefa).HasColumnName("id_tarefa");
            entity.Property(e => e.Matricula).HasColumnName("matricula");
            entity.Property(e => e.DataEntrega).HasColumnName("data_entrega");
            entity.Property(e => e.Arquivo).HasMaxLength(1000).HasColumnName("arquivo");

            entity.HasOne(d => d.IdTarefaNavigation)
                .WithMany(p => p.EntregarTarefas)
                .HasForeignKey(d => d.IdTarefa)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_entregar_tarefa_tarefas");

            entity.HasOne(d => d.MatriculaNavigation)
                .WithMany(p => p.EntregarTarefas)
                .HasForeignKey(d => d.Matricula)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_entregar_tarefa_usuarios");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}