import { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';

const DisciplinaForm = ({ idCurso, disciplinas, fecharModal }) => {
  const [disciplina, setDisciplina] = useState({
    idDisciplinas: 0,
    nome: '',
    semestre: '',
    idCurso,
  });

  const [disciplinasListadas, setDisciplinasListadas] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Sincroniza disciplinasListadas com disciplinas (props)
  useEffect(() => {
    setDisciplinasListadas(disciplinas);
  }, [disciplinas]);

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
      const novoId = disciplinasListadas.length
        ? Math.max(...disciplinasListadas.map((d) => d.idDisciplinas)) + 1
        : 1;
      const novaDisciplina = { ...disciplina, idDisciplinas: novoId };
      setDisciplinasListadas([...disciplinasListadas, novaDisciplina]);
    } else {
      setDisciplinasListadas(
        disciplinasListadas.map((d) =>
          d.idDisciplinas === disciplina.idDisciplinas ? disciplina : d
        )
      );
    }

    resetForm();
  };

  const handleEdit = (id) => {
    const disciplinaParaEditar = disciplinasListadas.find((d) => d.idDisciplinas === id);
    if (disciplinaParaEditar) {
      // Atualiza o estado e exibe o formulário após a atualização
      setDisciplina(disciplinaParaEditar);
      setShowForm(true);
    }
  };

  const handleNovoClick = () => {
    resetForm();
    setShowForm(true);
  };

  const resetForm = () => {
    setDisciplina({ idDisciplinas: 0, nome: '', semestre: '', idCurso });
    setShowForm(false);
  };

  return (
    <>
      <Table striped bordered hover>
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
                  className="btn btn-outline-primary"
                >
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
              </td>
              <td>
                <button className='btn btn-outline-danger'>
                <i className="fa-regular fa-trash-can"></i>

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button onClick={handleNovoClick} variant="primary" className="mt-3">
        Novo
      </Button>

      {showForm && (
        <div className="bg-primary-subtle p-4 rounded-3 shadow-sm mt-3">
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
