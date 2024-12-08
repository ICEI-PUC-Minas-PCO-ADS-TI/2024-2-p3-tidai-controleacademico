import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import '../../styles/index.css';
import api from '../../api/api';

const ViewDisciplina = (props) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [showDisciplinaModal, setShowDisciplinaModal] = useState(false);
    const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);
    const [disciplinas, setDisciplinas] = useState([]);
    const [disciplina, setDisciplina] = useState({ idDisciplinas: 0 });

    // Modal visibility toggle
    const toggleDisciplinaModal = () => setShowDisciplinaModal(!showDisciplinaModal);

    const disciplinaInicial = {
        idDisciplinas: 0,
        nome: '',
        semestre: '',
    };

    const disciplinaAtual = props.disciplinaSelecionado.idDisciplinas !== 0 
        ? props.disciplinaSelecionado 
        : disciplinaInicial;

    useEffect(() => {
        if (props.disciplinaSelecionado.idDisciplinas !== 0) {
            setDisciplina(props.disciplinaSelecionado);
        }
    }, [props.disciplinaSelecionado]);

    const inputTextHandler = (e) => {
        const { name, value } = e.target;
        setDisciplina({ ...disciplina, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!disciplina.nome || disciplina.nome.trim() === '' || disciplina.semestre === '') {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (disciplina.idDisciplinas !== 0) {
            await props.atualizarDisciplina(disciplina);
        } else {
            await props.addDisciplina(disciplina);
        }

        setDisciplina(disciplinaInicial);
        setShowDisciplinaModal(false);  // Fechar o modal após a submissão
    };

    const handleCancelar = (e) => {
        e.preventDefault();
        props.cancelarDisciplina();
        setDisciplina(disciplinaInicial);
    };

    // Buscar todas as disciplinas
    const pegaTodasDisciplinas = async () => {
        const response = await api.get('Disciplina');
        setDisciplinas(response.data);
    };

    useEffect(() => {
        pegaTodasDisciplinas();
    }, []);

    return (
        <>
            <Modal show={showDisciplinaModal} onHide={toggleDisciplinaModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Registro de Disciplina</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}> 
                        <div className="container bg-light p-3 my-3">
                            <div className="row mb-3 align-items-center">
                                <h6 className="form-label mt-3">Disciplinas por Semestre</h6>
                            </div>

                            <div className="row align-items-center mb-2">
                                <div className="col-6">
                                    <span style={{ color: 'red' }}>*</span>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="nome" 
                                        name="nome"
                                        onChange={inputTextHandler}
                                        value={disciplina.nome}
                                        required
                                        placeholder="Disciplina" 
                                    />
                                </div>

                                <div className="col-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="semestre" 
                                        name="semestre"
                                        onChange={inputTextHandler}
                                        value={disciplina.semestre}
                                        required
                                        placeholder="Semestre" 
                                    />
                                </div>

                                <div className="col-2 text-center">
                                    <button 
                                        id="btn_unfilter" 
                                        type="button" 
                                        className="btn btn-outline-danger">
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                    <button 
                                        id="btn_unfilter" 
                                        type="button" 
                                        className="btn btn-outline-danger">
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>

                                <div className="my-3">
                                    <button className="btn btn-outline-primary">+</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal
                show={smShowConfirmModal}
                onHide={() => setSmShowConfirmModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Excluir Disciplina</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Tem certeza que deseja excluir esta disciplina?</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setSmShowConfirmModal(false)}>
                        Fechar
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => props.deletarDisciplina(disciplina.idDisciplinas)}
                    >
                        Excluir
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ViewDisciplina;
