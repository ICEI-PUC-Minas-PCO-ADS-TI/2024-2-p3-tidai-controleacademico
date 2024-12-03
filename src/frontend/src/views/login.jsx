import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styles/App.css';

export default function Login() {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // Controla o estado do modal
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!matricula || !senha) {
      setErrorMessage('Matrícula e senha são obrigatórios.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    try {
      const response = await axios.post('https://localhost:7198/api/Login/login', {
        matricula,
        senha,
      });

      if (response.status === 200) {
        const { matricula, nome, tipo } = response.data;
        localStorage.setItem('usuario', JSON.stringify({ matricula, nome, tipo }));

        if (tipo === 'Aluno') {
          navigate('/aluno');
        } else if (tipo === 'Professor') {
          navigate('/professor');
        } else if (tipo === 'Secretário') {
          navigate('/secretario');
        } else {
          setErrorMessage('Tipo de usuário inválido.');
          setTimeout(() => setErrorMessage(''), 3000);
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Matrícula ou senha inválidos.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  return (
    <div className="login-page">
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#003366' }}>
        <div className="login-container">
          <img
            src="https://static.vecteezy.com/ti/vetor-gratis/p1/15668053-modelo-de-design-de-logotipo-da-faculdade-ilustracaoial-logotipo-da-faculdade-da-universidade-distintivos-emblemas-sinais-estoque-logotipo-do-campus-da-faculdade-gratis-vetor.jpg"
            alt="Logo da UNIBH"
            className="login-logo"
            style={{ width: '150px', height: 'auto' }}
          />
          <h2>Sistema de Controle Acadêmico</h2>
          {errorMessage && (
            <div className="alert alert-danger mt-3">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="login-matricula" className="form-label">Matrícula</label>
              <input
                type="text"
                className="form-control"
                id="login-matricula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                placeholder="Matrícula institucional"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="senha" className="form-label">Senha</label>
              <input
                type="password"
                className="form-control"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Sua senha"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-1">Entrar</button>
          </form>
          <div className="row">
            <div className="col-6 text-center mt-3">
              <button className="btn btn-link p-0" onClick={handleModalShow}>
                Esqueceu a senha?
              </button>
            </div>
            <div className="col-6 text-center mt-3">
              <Link to="/">Voltar a tela inicial</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal usando react-bootstrap */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Esqueci minha senha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
          Procure o secretário acadêmico para atualizar suas informações cadastrais.<b> Após análise será enviado por email sua nova senha</b>, lembre-se de levar documentos que comprovem sua identidade. 
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleModalClose}>
          Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
