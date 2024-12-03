import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; // Importando os componentes do React-Bootstrap
import '../../styles/menuUsuarios.css';

export default function AtividadeProf() {
    const [atividades, setAtividades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estado para controlar a visibilidade do modal
    const [showModal, setShowModal] = useState(false);

    // Função para buscar as atividades da API
    useEffect(() => {
        const fetchAtividades = async () => {
            try {
                const response = await axios.get('https://localhost:7198/api/TarefaDisciplina');
                setAtividades(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchAtividades();
    }, []);

    // Funções para abrir e fechar o modal
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div className="container">
            <h1 className="titulo mb-5">Painel de Controle</h1>
            <Button variant="primary" onClick={handleShowModal}>Adicionar Tarefa</Button> {/* Botão para abrir o modal */}

            {/* Accordion das atividades */}
            <div className="accordion mb-5" id="accordionExample">
                {atividades.map((atividade, index) => (
                    <div className="accordion-item" key={atividade.idTarefa}>
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                                {atividade.titulo} - {atividade.modulo}
                            </button>
                        </h2>
                        <div id={`collapse${index}`} className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <ul className="list-group">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        <p>Disponível até {atividade.dataEntrega} | {atividade.valor} pts</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal para adicionar tarefa */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Tarefa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-3">
                            <label htmlFor="moduloInput" className="form-label">Módulo</label>
                            <input type="text" className="form-control" id="moduloInput" placeholder="001" disabled />
                        </div>

                        <div className="col-9">
                            <label htmlFor="tituloInput" className="form-label">Título</label>
                            <input type="text" className="form-control" id="tituloInput" placeholder="Título da tarefa" />
                        </div>

                        <div className="col-6">
                            <label htmlFor="valorInput" className="form-label">Valor</label>
                            <input type="number" className="form-control" id="valorInput" placeholder="Ex: 10" />
                        </div>

                        <div className="col-6">
                            <label htmlFor="dataEntregaInput" className="form-label">Data de entrega</label>
                            <input type="date" className="form-control" id="dataEntregaInput" />
                        </div>

                        <div className="col-12">
                            <label htmlFor="descricaoInput" className="form-label">Descrição</label>
                            <textarea className="form-control" id="descricaoInput" rows="3" placeholder="Descrição da tarefa"></textarea>
                        </div>

                        <div className="col-12">
                            <label htmlFor="arquivoTarefaInput" className="form-label">Arquivo-Tarefa</label>
                            <input type="file" className="form-control" id="arquivoTarefaInput" name="arquivoTarefa" />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                    <Button variant="primary">
                        Salvar Tarefa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
