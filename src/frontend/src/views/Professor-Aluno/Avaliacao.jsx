import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import '../../styles/menuUsuarios.css';

export default function Avaliacao() {
    const [entregas, setEntregas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [novaEntrega, setNovaEntrega] = useState({
        idEntrega: 0,
        idTarefa: 0,
        matricula: 0,
        dataEntrega: '',
        arquivo: '',
        nota: 0,
        idTarefaNavigation: null,
        matriculaNavigation: null
    });
    
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [entregaParaExcluir, setEntregaParaExcluir] = useState(null);

    useEffect(() => {
        // Substitua a URL pela URL do seu backend
        axios.get('https://localhost:7198/api/EntregarTarefa')
            .then(response => {
                setEntregas(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleShowModal = (entrega = null) => {
        if (entrega) {
            setNovaEntrega({ ...entrega });
        } else {
            setNovaEntrega({
                idEntrega: 0,
                idTarefa: 0,
                matricula: 0,
                dataEntrega: '',
                arquivo: '',
                nota: 0,
                idTarefaNavigation: null,
                matriculaNavigation: null
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovaEntrega({
            ...novaEntrega,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setNovaEntrega({
            ...novaEntrega,
            arquivo: e.target.files[0].name,
        });
    };

    const handleSaveEntrega = () => {
        const payload = { ...novaEntrega };

        if (novaEntrega.idEntrega) {
            // Editar entrega
            axios.put(`https://localhost:7198/api/EntregarTarefa/${novaEntrega.idEntrega}`, payload)
                .then(response => {
                    setEntregas(entregas.map(entrega => 
                        entrega.idEntrega === novaEntrega.idEntrega ? response.data : entrega
                    ));
                    handleCloseModal();
                })
                .catch(err => {
                    console.error('Erro ao atualizar a entrega:', err);
                });
        } else {
            // Criar nova entrega
            axios.post('https://localhost:7198/api/EntregarTarefa', payload)
                .then(response => {
                    setEntregas([...entregas, response.data]);
                    handleCloseModal();
                })
                .catch(err => {
                    console.error('Erro ao salvar a entrega:', err);
                });
        }
    };

    const handleShowDeleteModal = (entrega) => {
        setEntregaParaExcluir(entrega);
        setShowDeleteModal(true);
    };

    const handleDeleteEntrega = () => {
        if (entregaParaExcluir) {
            axios.delete(`https://localhost:7198/api/EntregarTarefa/${entregaParaExcluir.idEntrega}`)
                .then(() => {
                    setEntregas(entregas.filter(entrega => entrega.idEntrega !== entregaParaExcluir.idEntrega));
                    setShowDeleteModal(false);
                })
                .catch(err => {
                    console.error('Erro ao excluir a entrega:', err);
                });
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div className="container">
            <h1 className="titulo mb-5">Painel de Atividade Entregues</h1>
            
            <div>
                <button className="m-4 btn btn-success" onClick={() => handleShowModal()}>
                    Adicionar Entrega
                </button>
            </div>

            <div>
                <ul className="list-group">
                    {entregas.map(entrega => (
                        <li key={entrega.idEntrega} className="list-group-item d-flex justify-content-between align-items-center">
                            <p>{`Tarefa: ${entrega.idTarefa}, Matrícula: ${entrega.matricula}, Data de entrega: ${entrega.dataEntrega}`}</p>
                            <div>
                                <button className="btn btn-primary ms-2" onClick={() => handleShowModal(entrega)}>
                                    <i className="fa-regular fa-pen-to-square"></i> Editar
                                </button>
                                <button className="btn btn-danger ms-2" onClick={() => handleShowDeleteModal(entrega)}>
                                    <i className="fa-regular fa-trash-can"></i> Excluir
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Modal para adicionar ou editar entrega */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{novaEntrega.idEntrega ? 'Editar Entrega' : 'Adicionar Entrega'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-6">
                            <label htmlFor="tarefaInput" className="form-label">ID Tarefa</label>
                            <input
                                type="number"
                                className="form-control"
                                id="tarefaInput"
                                name="idTarefa"
                                value={novaEntrega.idTarefa}
                                onChange={handleInputChange}
                                placeholder="ID da Tarefa"
                            />
                        </div>

                        <div className="col-6">
                            <label htmlFor="matriculaInput" className="form-label">Matrícula</label>
                            <input
                                type="number"
                                className="form-control"
                                id="matriculaInput"
                                name="matricula"
                                value={novaEntrega.matricula}
                                onChange={handleInputChange}
                                placeholder="Matrícula"
                            />
                        </div>

                        <div className="col-6">
                            <label htmlFor="dataEntregaInput" className="form-label">Data de Entrega</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dataEntregaInput"
                                name="dataEntrega"
                                value={novaEntrega.dataEntrega}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="col-6">
                            <label htmlFor="arquivoInput" className="form-label">Arquivo</label>
                            <input
                                type="file"
                                className="form-control"
                                id="arquivoInput"
                                name="arquivo"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="col-6">
                            <label htmlFor="notaInput" className="form-label">Nota</label>
                            <input
                                type="number"
                                className="form-control"
                                id="notaInput"
                                name="nota"
                                value={novaEntrega.nota}
                                onChange={handleInputChange}
                                placeholder="Nota"
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleSaveEntrega}>
                        {novaEntrega.idEntrega ? 'Atualizar Entrega' : 'Salvar Entrega'}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal de confirmação de exclusão */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Você tem certeza que deseja excluir esta entrega?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDeleteEntrega}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
