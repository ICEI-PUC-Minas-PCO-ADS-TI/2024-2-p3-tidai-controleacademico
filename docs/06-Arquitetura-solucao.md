# Arquitetura da solução

<span style="color:red">Pré-requisitos: <a href="04-Projeto-interface.md"> Projeto de interface</a></span>

O sistema de gestão acadêmica será dividido em dois componentes principais: Front-end e Back-end, comunicando-se através de APIs REST. A aplicação será hospedada na nuvem para garantir escalabilidade e alta disponibilidade. A arquitetura segue o padrão MVC (Model-View-Controller), onde:

Model: Representa os dados e as regras de negócios, manipulados pelo banco de dados MySQL.
View: Responsável pela interface com o usuário, desenvolvida em React.
Controller: Lida com as requisições HTTP no back-end, implementado em C# com o framework .NET.

Estrutura da solução
Front-end:
React com react-router-dom para navegação entre páginas.
Axios para consumir as APIs do back-end.
Back-end:
C# com .NET para construir APIs REST.
Integração com MySQL para persistência de dados.
Hospedagem:
AWS (Amazon web Services)
## Diagrama de classes

O diagrama de classes será modelado com base nos principais componentes do sistema:

Usuário:
Subclasses: Aluno, Professor e Secretário.
Atributos: Nome, CPF, Matrícula, E-mail, Senha, Tipo de Usuário.
Curso:
Atributos: Nome do curso, Tipo, Nível.
Disciplina:
Atributos: Nome, Semestre, Curso.
Material de Apoio:
Atributos: Módulo, Título, Descrição, Link para Vídeo-aula.
Tarefa:
Atributos: Título, Valor, Data de Entrega, Nota.
Presença:
Atributos: Data, Status de Presença

> **Links úteis**:
![alt text](<bancodedados.jpg>)

#

Modelo ER (Entidade-Relacionamento)
Entidades:
Usuários
Cursos
Disciplinas
Materiais
Tarefas
Presenças
Relacionamentos:
Um usuário pode estar associado a vários cursos.
Cada curso possui várias disciplinas.
Cada disciplina possui materiais e tarefas associados.
Esquema Relacional
Tabelas:
Usuarios: matricula, nome, cpf, email, senha, tipo, id_curso.
Cursos: id_curso, nome, tipo, nivel.
Disciplinas: id_disciplina, nome, semestre, id_curso.
Materiais: id_material, titulo, descricao, link, id_disciplina.
Tarefas: id_tarefa, titulo, valor, data_entrega, nota, id_disciplina.
Presencas: data, status, id_usuario, id_disciplina.


### Modelo físico
-- Criar o banco de dados e garantir que ele não exista
DROP DATABASE IF EXISTS controle_academico;
CREATE DATABASE controle_academico DEFAULT CHARACTER SET utf8;

-- Selecionar o banco de dados
USE controle_academico;

-- Criar a tabela cursos
CREATE TABLE IF NOT EXISTS cursos (
  id_cursos INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NULL,
  nivel INT(1) NULL,
  tipo INT(1) NULL,
  PRIMARY KEY (id_cursos)
) ENGINE = InnoDB;

-- Criar a tabela usuarios com a coluna matricula como AUTO_INCREMENT
CREATE TABLE IF NOT EXISTS usuarios (
  matricula INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NULL,
  cpf VARCHAR(11) NULL,
  email VARCHAR(45) NULL,
  endereco VARCHAR(45) NULL,
  tipo INT NULL,
  senha VARCHAR(45) NULL,
  id_curso INT NOT NULL, -- Coluna para referenciar cursos
  PRIMARY KEY (matricula),
  CONSTRAINT fk_usuarios_cursos
    FOREIGN KEY (id_curso)
    REFERENCES cursos (id_cursos)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Criar a tabela disciplinas
CREATE TABLE IF NOT EXISTS disciplinas (
  id_disciplinas INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NULL,
  semestre INT NULL,
  id_curso INT NOT NULL, -- Coluna para referenciar cursos
  PRIMARY KEY (id_disciplinas),
  CONSTRAINT fk_disciplinas_cursos
    FOREIGN KEY (id_curso)
    REFERENCES cursos (id_cursos)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Criar a tabela disciplinas_usuario
CREATE TABLE IF NOT EXISTS disciplinas_usuario (
  matricula INT NOT NULL,
  id_disciplinas INT NOT NULL,
  CONSTRAINT fk_disciplinas_usuario_usuarios
    FOREIGN KEY (matricula)
    REFERENCES usuarios (matricula)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_disciplinas_usuario_disciplinas
    FOREIGN KEY (id_disciplinas)
    REFERENCES disciplinas (id_disciplinas)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Criar a tabela material_disciplina
CREATE TABLE IF NOT EXISTS material_disciplina (
  id_materia INT NOT NULL AUTO_INCREMENT,
  modulo INT NULL,
  titulo VARCHAR(45) NULL,
  link_videoaula VARCHAR(1000) NULL,
  descricao VARCHAR(255) NULL,
  id_disciplinas INT NOT NULL, -- Coluna para referenciar disciplinas
  PRIMARY KEY (id_materia),
  CONSTRAINT fk_material_disciplina_disciplinas
    FOREIGN KEY (id_disciplinas)
    REFERENCES disciplinas (id_disciplinas)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Criar a tabela presenca
CREATE TABLE IF NOT EXISTS presenca (
  data DATE NULL,
  presenca INT NULL,
  id_disciplinas_usuario INT NOT NULL, -- Coluna para referenciar disciplinas_usuario
  CONSTRAINT fk_presenca_disciplinas_usuario
    FOREIGN KEY (id_disciplinas_usuario)
    REFERENCES disciplinas_usuario (matricula)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Criar a tabela tarefas_disciplina
CREATE TABLE IF NOT EXISTS tarefas_disciplina (
  Id_tarefa INT NOT NULL AUTO_INCREMENT,
  modulo VARCHAR(45) NULL,
  titulo VARCHAR(45) NULL,
  valor INT NULL,
  data_entrega DATE NULL,
  link_arquivo_tarefa VARCHAR(1000) NULL,
  id_disciplinas INT NOT NULL, -- Coluna para referenciar disciplinas
  PRIMARY KEY (Id_tarefa),
  CONSTRAINT fk_tarefas_disciplinas
    FOREIGN KEY (id_disciplinas)
    REFERENCES disciplinas (id_disciplinas)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Remover a tabela notas_tarefas, que será substituída pela coluna nota em entregar_tarefa

DROP TABLE IF EXISTS notas_tarefas;

-- Criar a tabela entregar_tarefa (Nota movida para esta tabela)
CREATE TABLE IF NOT EXISTS entregar_tarefa (
  id_entrega INT NOT NULL AUTO_INCREMENT,
  matricula INT NOT NULL, -- Referência ao usuário que entrega a tarefa
  id_tarefa INT NOT NULL, -- Referência à tarefa que está sendo entregue
  texto_entrega VARCHAR(5000) NOT NULL, -- Campo para o texto entregue
  data_entrega DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Data e hora da entrega
  nota DECIMAL(5,2) NULL, -- Adicionada a nota aqui
  PRIMARY KEY (id_entrega),
  CONSTRAINT fk_entregar_tarefa_usuarios
    FOREIGN KEY (matricula)
    REFERENCES usuarios (matricula)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_entregar_tarefa_tarefas
    FOREIGN KEY (id_tarefa)
    REFERENCES tarefas_disciplina (Id_tarefa)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- Adicionar coluna 'img' na tabela 'material_disciplina'
ALTER TABLE material_disciplina
ADD COLUMN img VARCHAR(1000) NULL AFTER descricao;



## Tecnologias

Dimensão	Tecnologia
Front-end	React, HTML, CSS, JavaScript
Back-end	C# com .NET
SGBD	        MySQL
Hospedagem	AWS (Amazon Web Services)


## Hospedagem

A plataforma será hospedada na AWS (Amazon Web Services), aproveitando a infraestrutura robusta e escalável da Amazon para garantir alta disponibilidade e desempenho. O ambiente de hospedagem será estruturado da seguinte forma:

Amazon EC2 (Elastic Compute Cloud): Servidores virtuais para a aplicação e APIs backend.
Amazon RDS (Relational Database Service): Gerenciamento do banco de dados MySQL, com suporte a backups automatizados e alta disponibilidade.
Amazon S3 (Simple Storage Service): Armazenamento de arquivos estáticos, como documentos e imagens.
AWS CloudFront: Rede de distribuição de conteúdo (CDN) para reduzir a latência e melhorar o desempenho global.

## Qualidade de software

Para garantir que o software atenda às expectativas dos usuários e stakeholders, serão adotadas as características de qualidade definidas pela norma ISO. A equipe priorizará as seguintes subcaracterísticas, com justificativas e métricas associadas:
Características Prioritárias
Funcionalidade
Adequação funcional: Garantir que o sistema atenda completamente às funcionalidades previstas, como cadastro de usuários, gerenciamento de disciplinas e relatórios.
Métricas: Percentual de requisitos atendidos (≥95%).
Confiabilidade

Disponibilidade: Garantir que o sistema esteja disponível para uso na maior parte do tempo.
Métricas: Taxa de disponibilidade do sistema (≥99%).
Tolerância a falhas: O sistema deve ser capaz de se recuperar rapidamente de falhas imprevistas.
Métricas: Tempo médio para recuperação (MTTR ≤ 1 hora).
Usabilidade

Acessibilidade: Facilitar o uso para diferentes perfis de usuários, com design responsivo e aderente a boas práticas de UX.
Métricas: Pontuação mínima de 80% em avaliações de acessibilidade, como WCAG.
Capacidade de operação: Interface intuitiva, permitindo que usuários realizem tarefas sem dificuldades.
Métricas: Taxa de sucesso em tarefas simuladas (≥90%).
Eficiência

Comportamento em relação ao tempo: Garantir tempos de resposta curtos para operações críticas.
Métricas: Tempo de resposta médio (≤ 2 segundos).
Manutenibilidade

Modularidade: A aplicação será desenvolvida de forma modular, facilitando a adição de novas funcionalidades.
Métricas: Complexidade do código medida por ferramentas como SonarQube (baixo índice de complexidade).
Segurança

Confidencialidade: Os dados dos usuários serão protegidos com criptografia e autenticação segura.
Métricas: Realização de auditorias de segurança com zero vulnerabilidades críticas identificadas.
Processo de Avaliação
O controle de qualidade será realizado em sprints contínuos, com avaliações regulares baseadas em:

Testes automatizados de funcionalidade (unitários e de integração).
Testes manuais para validação de usabilidade.
Ferramentas de monitoramento como AWS CloudWatch e Lighthouse para desempenho e acessibilidade.