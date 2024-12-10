import { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';

const DisciplinaForm = ({ idCurso, disciplinas, fecharModal, excluirDisciplina, editarDisciplina, addDisciplina }) => {
  const [disciplina, setDisciplina] = useState({
    idDisciplinas: 0,
    nome: '',
    semestre: '',
    idCurso,
  });

  const [disciplinasListadas, setDisciplinasListadas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // Armazena o ID da disciplina a ser excluída

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
      // Adicionando nova disciplina
      addDisciplina(disciplina); // Chama a função para adicionar disciplina
    } else {
      // Editando disciplina existente
      editarDisciplina(disciplina); // Chama a função para editar disciplina
    }

    resetForm();
  };

  const handleEdit = (id) => {
    const disciplinaParaEditar = disciplinasListadas.find((d) => d.idDisciplinas === id);
    if (disciplinaParaEditar) {
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

  // Abre o modal de exclusão
  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // Função para excluir a disciplina
  const handleDelete = () => {
    if (deleteId !== null) {
      excluirDisciplina(deleteId);  // Chama a função passar para excluir na API ou na lista
      setDeleteId(null);  // Reseta o ID da disciplina a ser excluída
      setShowDeleteModal(false);  // Fecha o modal de exclusão
    }
  };

  return (
    <>
      <Table striped hover>
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
                <button
                  onClick={() => handleDeleteModal(d.idDisciplinas)}  // Abre o modal de exclusão
                  className="btn btn-outline-danger"
                >
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showForm && (
        <div className="bg-primary-subtle p-4 rounded-3 shadow-sm mt-3">
          <h5><b>Adicionar / Editar Disciplina</b></h5>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className='col-8'>
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
              </div>
              <div className='col-4'>
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
              </div>
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

      <div className="modal-footer border-top mt-3">
        <Button onClick={fecharModal} variant="secondary">
          Fechar
        </Button>
        <Button onClick={handleNovoClick} variant="primary">
          Novo
        </Button>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir esta disciplina?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DisciplinaForm;
