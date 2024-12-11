import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import '../../styles/index.css';
import UsuarioForm from '../../components/secretario/UsuarioForm';
import UsuarioLista from '../../components/secretario/UsuarioLista';
import UsuarioDisciplina from '../../components/secretario/UsuarioDisicplina';
import api from '../../api/api';

const ViewCadastroUser = () => {
  const [errorMessage, setErrorMessage] = useState('');


  const [showUsuarioModal, setShowUsuarioModal] = useState(false);
  const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);
  const [showShowDisciplinaModal, setshowShowDisciplinaModal] = useState(false);

  const handleUsuarioModal = () =>
    setShowUsuarioModal(!showUsuarioModal);
  const handleDisciplinaModal = (matricula) => {
    if (matricula === 0) {
      setshowShowDisciplinaModal(false);  // Fecha o modal
    } else {
      setUsuario({ matricula }); // Define a matrícula do usuário no estado
      setshowShowDisciplinaModal(true); // Abre o modal de disciplinas
    }
  };
  



  const handleConfirmModal = (matricula) => {
    if (matricula !== 0 && matricula !== undefined) {
      const usuario = usuarios.filter(
        (usuario) => usuario.matricula === matricula
      );
      setUsuario(usuario[0]);
    } else {
      setUsuario({ matricula: 0 });
    }
    setSmShowConfirmModal(!smShowConfirmModal);
  };

  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState({ matricula: 0 });


  const novoUsuario = () => {
    setUsuario({ matricula: 0 });
    handleUsuarioModal();
  };

  const pegaTodosUsuarios = async () => {
    const response = await api.get('Usuarios');
    return response.data;
  };

  useEffect(() => {
    const getUsuarios = async () => {
      const todasUsuarios = await pegaTodosUsuarios();
      if (todasUsuarios) setUsuarios(todasUsuarios);
    };
    getUsuarios();
  }, []);

  const addUsuario = async (usuario) => {
    handleUsuarioModal();
    const response = await api.post('Usuarios', usuario);
    console.log(response.data);
    setUsuarios([...usuarios, response.data]);
  }

  const deletarUsuario = async (matricula) => {
    handleConfirmModal(0);

    try {
      const response = await api.delete(`Usuarios/${matricula}`);

      // Se a exclusão for bem-sucedida, atualize o estado
      const usuariosFiltrados = usuarios.filter(
        (usuario) => usuario.matricula !== matricula
      );
      setUsuarios([...usuariosFiltrados]);

    } catch (error) {
      // Exibe a mensagem de erro se não for possível excluir o usuário
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || "Não é permitido excluir o usuário pois possuí informações cadastrados.";
        setErrorMessage(errorMessage);  // Armazena a mensagem de erro

        // Remove a mensagem de erro após 3 segundos
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);  // 3000 milissegundos = 3 segundos
      } else {
        setErrorMessage("Erro desconhecido ao tentar excluir o usuário.");

        // Remove a mensagem de erro após 3 segundos
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);  // 3000 milissegundos = 3 segundos
      }
    }
  }



  const pegarUsuario = (matricula) => {
    const usuario = usuarios.filter((usuario) => usuario.matricula === matricula);
    setUsuario(usuario[0]);
    handleUsuarioModal();
  }

  const atualizarUsuario = async (usuario) => {
    handleUsuarioModal();
    const response = await api.put(`Usuarios/${usuario.matricula}`, usuario);
    const { matricula } = response.data;
    setUsuarios(
      usuarios.map((item) => (item.matricula === matricula ? response.data : item))
    );
    setUsuario({ matricula: 0 });
  }

  const cancelarUsuario = () => {
    setUsuario({ matricula: 0 });
    handleUsuarioModal();
  }

  const [filtros, setFiltros] = useState({
    matricula: '',
    nome: '',
    cpf: '',
    tipo: '',
  });
  const filtrarUsuarios = () => {
    const usuariosFiltrados = usuarios.filter((usuario) => {
      return (
        (filtros.matricula === '' || usuario.matricula.toString().includes(filtros.matricula)) &&
        (filtros.nome === '' || usuario.nome.toLowerCase().includes(filtros.nome.toLowerCase())) &&
        (filtros.cpf === '' || usuario.cpf.includes(filtros.cpf)) &&
        (filtros.tipo === '' || usuario.tipo === filtros.tipo) // Verifique a comparação correta
      );
    });
    setUsuarios(usuariosFiltrados);
  };

  const limparFiltros = async () => {
    setFiltros({ matricula: '', nome: '', cpf: '', tipo: '' });
    const todasUsuarios = await pegaTodosUsuarios();
    setUsuarios(todasUsuarios);
  };

  return (
    <div className="height-100">
      <h4 className='p-5'>Gestão de Usuários</h4>
      <div className="container">
        {/* Filtros */}
        <div className="row mb-3">
          <div className="col-2">
            <input
              type="text"
              className="form-control"
              placeholder="Matricula"
              value={filtros.matricula}
              onChange={(e) => setFiltros({ ...filtros, matricula: e.target.value })}
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="form-control"
              placeholder="Nome"
              value={filtros.nome}
              onChange={(e) => setFiltros({ ...filtros, nome: e.target.value })}
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="form-control"
              placeholder="Cpf"
              value={filtros.cpf}
              onChange={(e) => setFiltros({ ...filtros, cpf: e.target.value })}
            />
          </div>
          <div className="col-2">
            <select
              className="form-select"
              value={filtros.tipo}
              onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value ? parseInt(e.target.value) : '' })}
            >
              <option value="">Todos</option>
              <option value="0">Alunos</option>
              <option value="1">Professores</option>
              <option value="2">Secretário</option>
            </select>

          </div>
          <div className="col-4">
            <button id="btn_add" type="button" className="btn btn-primary me-1" onClick={filtrarUsuarios}>
              Pesquisar
            </button>
            <button id="btn_unfilter" type="button" className="btn btn-secondary me-4" onClick={limparFiltros}>
              Limpar busca
            </button>
            <button type="button" className="btn btn-success" onClick={novoUsuario}>
              Novo Registro
            </button>
          </div>
        </div>
        {errorMessage && (
          <div className="alert alert-danger mt-3">
            {errorMessage}
          </div>
        )}



        {/* Tabela */}
        <table className="table table-striped table-responsive">
          <thead>
            <tr>
              <th scope="col">matricula</th>
              <th scope="col">Nome</th>
              <th scope="col">Cpf</th>
              <th scope="col">Email</th>
              <th scope="col">Endereço</th>
              <th scope="col">Tipo</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <UsuarioLista
              key={usuario.matricula}
              deletarUsuario={deletarUsuario}
              pegarUsuario={pegarUsuario}
              usuario={usuario}
              usuarios={usuarios}
              handleConfirmModal={handleConfirmModal}
              handleDisciplinaModal={handleDisciplinaModal}
            />
          </tbody>
        </table>



        <Modal show={showUsuarioModal} onHide={handleUsuarioModal}>
          <Modal.Header closeButton>
            <Modal.Title>Registro Usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UsuarioForm
              addUsuario={addUsuario}
              cancelarUsuario={cancelarUsuario}
              atualizarUsuario={atualizarUsuario}
              usuarios={usuarios}
              usuarioSelecionado={usuario} />

          </Modal.Body>
        </Modal>

        <Modal
          show={smShowConfirmModal}
          onHide={handleConfirmModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Exclur Usuario
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza que deseja Excluir o Usuario de Matricula {usuario.matricula}?
          </Modal.Body>
          <Modal.Footer className='d-flex justify-content-between'>
            <button
              className='btn btn-outline-success me-2'
              onClick={() => deletarUsuario(usuario.matricula)}
            >
              <i className='fas fa-check me-2'></i>
              Sim
            </button>
            <button
              className='btn btn-danger me-2'
              onClick={() => handleConfirmModal(0)}
            >
              <i className='fas fa-times me-2'></i>
              Não
            </button>
          </Modal.Footer>
        </Modal>

        <Modal
  show={showShowDisciplinaModal}
  onHide={() => handleDisciplinaModal(0)} // Passa 0 para fechar o modal
>
  <Modal.Header closeButton>
    <Modal.Title>
      Disciplinas do Usuário
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <UsuarioDisciplina />
  </Modal.Body>
  <Modal.Footer className='d-flex justify-content-between'>
    <button onClick={() => handleDisciplinaModal(0)}>Fechar</button> {/* Também passa 0 para fechar */}
    <button
      className='btn btn-danger me-2'
      onClick={() => handleDisciplinaModal(0)}
    >
      Salvar
    </button>
  </Modal.Footer>
</Modal>


      </div>
    </div>
  );
};

export default ViewCadastroUser;
