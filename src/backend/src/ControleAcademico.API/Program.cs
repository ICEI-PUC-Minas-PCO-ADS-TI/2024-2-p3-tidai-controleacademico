using System.Text.Json.Serialization;
using ControleAcademico.Data.Context;
using ControleAcademico.Data.Repositories;
using ControleAcademico.Domain.Interfaces.Repositories;
using ControleAcademico.Domain.Interfaces.Services;
using ControleAcademico.Domain.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configurando o Contexto do banco de dados
builder.Services.AddDbContext<ControleAcademicoContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("Default"),
        new MySqlServerVersion(new Version(8, 0, 25)) // Substitua pela versão do MySQL que você está usando
    )
);

// Adicionando os repositórios e serviços
builder.Services.AddScoped<IgeralRepo, GeralRepo>();
builder.Services.AddScoped<ICursoRepo, CursoRepo>();
builder.Services.AddScoped<ICursoService, CursoService>();
builder.Services.AddScoped<IDisciplinaRepo, DisciplinaRepo>();
builder.Services.AddScoped<IDisciplinaService, DisciplinaService>();
builder.Services.AddScoped<IMaterialDisciplinaRepo, MaterialDisciplinaRepo>();
builder.Services.AddScoped<IMaterialDisciplinaService, MaterialDisciplinaService>();
builder.Services.AddScoped<ITarefasDisciplinaRepo, TarefaDisciplinaRepo>();
builder.Services.AddScoped<ITarefaDisciplinaService, TarefaDisciplinaService>();

builder.Services.AddScoped<IPresencaRepo, PresencaRepo>();
builder.Services.AddScoped<IPresencaService, PresencaService>();

builder.Services.AddScoped<IRelacionamentoUsuarioDisciplinaRepo, RelacionamentoRepo>();
builder.Services.AddScoped<IRelacionamentoUsuarioDisciplinaService, RelacionamentoUsuarioDisciplinaService>();

builder.Services.AddScoped<IUsuarioRepo, UsuarioRepo>();
builder.Services.AddScoped<IUsuarioService, UsuarioService>();

builder.Services.AddScoped<IEntregarTarefaRepo, EntregarTarefaRepo>();
builder.Services.AddScoped<IEntregarTarefaService, EntregarTarefaService>();

// Configurando CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin() // Permite qualquer origem
                   .AllowAnyMethod() // Permite qualquer método (GET, POST, etc.)
                   .AllowAnyHeader(); // Permite qualquer cabeçalho
        });
});

// Configurando os controllers e as opções de JSON
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

// Adicionando o Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configurar o pipeline de requisições
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
        c.RoutePrefix = string.Empty; // Define o Swagger na raiz do localhost
    });
}

app.UseHttpsRedirection();
            app.UseCors(option => option.AllowAnyHeader()
                                        .AllowAnyMethod()
                                        .AllowAnyOrigin());
app.UseAuthorization();
app.MapControllers();
app.Run();
