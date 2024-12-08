import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';

const DisciplinaForm = ({ idCurso, disciplinas, fecharModal }) => {
  const [disciplina, setDisciplina] = useState({
    idDisciplinas: 0,
    nome: '',
    semestre: '',
    idCurso,
  });

  const [disciplinasListadas, setDisciplinasListadas] = useState(disciplinas);
  const [showForm, setShowForm] = useState(false); // Estado para controlar visibilidade do formulário

  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    setDisciplina({ ...disciplina, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!disciplina.nome || disciplina.semestre === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Verifique se está adicionando ou editando a disciplina
    if (disciplina.idDisciplinas === 0) {
      setDisciplinasListadas([...disciplinasListadas, disciplina]); // Corrigido aqui
    } else {
      setDisciplinasListadas(
        disciplinasListadas.map((d) =>
          d.idDisciplinas === disciplina.idDisciplinas ? disciplina : d
        )
      ); // Corrigido aqui
    }

    // Limpar campos e esconder formulário
    setDisciplina({ idDisciplinas: 0, nome: '', semestre: '', idCurso });
    setShowForm(false);
  };

  const handleEdit = (id) => {
    const disciplinaParaEditar = disciplinasListadas.find((d) => d.idDisciplinas === id);
    setDisciplina(disciplinaParaEditar);
    setShowForm(true); // Mostrar formulário ao editar
  };

  const handleNovoClick = () => {
    setDisciplina({ idDisciplinas: 0, nome: '', semestre: '', idCurso }); // Resetar formulário
    setShowForm(true); // Mostrar formulário
  };

  return (
    <>
      <h5>Disciplinas do Curso</h5>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Disciplina</th>
            <th>Semestre</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {disciplinasListadas.map((d) => (
            <tr key={d.idDisciplinas}>
              <td>{d.nome}</td>
              <td>{d.semestre}</td>
              <td>
                <button
                  onClick={() => handleEdit(d.idDisciplinas)}
                  className="btn btn-link"
                >
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
              </td>
              <td>
                <i className="fa-regular fa-trash-can"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleNovoClick}>Novo</button>

      {showForm && (
        <div className="bg-primary-subtle p-4 rounded-3 shadow-sm">
          <h6>Adicionar / Editar Disciplina</h6>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nome da Disciplina</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                onChange={inputTextHandler}
                value={disciplina.nome}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="semestre" className="form-label">Semestre</label>
              <input
                type="number"
                className="form-control"
                name="semestre"
                onChange={inputTextHandler}
                value={disciplina.semestre}
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={() => setShowForm(false)}>
                Fechar
              </Button>
              <Button variant="primary" type="submit">
                {disciplina.idDisciplinas === 0 ? 'Adicionar' : 'Atualizar'} Disciplina
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default DisciplinaForm;
