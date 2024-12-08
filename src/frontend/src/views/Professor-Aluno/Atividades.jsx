import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import '../../styles/menuUsuarios.css';

export default function Atividade() {
    const [atividades, setAtividades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estado para controlar a visibilidade do modal
    const [showModal, setShowModal] = useState(false);
    const [novaTarefa, setNovaTarefa] = useState({
        idTarefa: null,
        titulo: '',
        modulo: '',
        valor: 0,
        dataEntrega: '',
        linkArquivoTarefa: '',
        idDisciplinas: 0,
        idDisciplinasNavigation: null,
        entregarTarefas: []
    });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovaTarefa({
            ...novaTarefa,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setNovaTarefa({
            ...novaTarefa,
            linkArquivoTarefa: e.target.files[0],
        });
    };

    // Função para salvar a nova tarefa (POST ou PUT)
    const handleSaveTarefa = () => {
        const formData = new FormData();
        formData.append('titulo', novaTarefa.titulo);
        formData.append('modulo', novaTarefa.modulo);
        formData.append('valor', novaTarefa.valor);
        formData.append('dataEntrega', novaTarefa.dataEntrega);
        formData.append('idDisciplinas', novaTarefa.idDisciplinas);
        formData.append('idDisciplinasNavigation', novaTarefa.idDisciplinasNavigation);
        formData.append('linkArquivoTarefa', novaTarefa.linkArquivoTarefa);

        if (novaTarefa.idTarefa) {
            // Atualizando uma tarefa existente (PUT)
            axios.put(`https://localhost:7198/api/TarefaDisciplina/${novaTarefa.idTarefa}`, formData)
                .then(response => {
                    setAtividades(atividades.map(atividade =>
                        atividade.idTarefa === novaTarefa.idTarefa ? response.data : atividade
                    ));
                    handleCloseModal();
                })
                .catch(err => console.error('Erro ao atualizar a tarefa:', err));
        } else {
            // Criando uma nova tarefa (POST)
            axios.post('https://localhost:7198/api/TarefaDisciplina', formData)
                .then(response => {
                    setAtividades([...atividades, response.data]);
                    handleCloseModal();
                })
                .catch(err => console.error('Erro ao salvar a tarefa:', err));
        }
    };

    const handleEditTarefa = (atividade) => {
        setNovaTarefa({
            ...atividade,
            linkArquivoTarefa: null, // Resetando o arquivo ao editar
        });
        setShowModal(true);
    };

    const handleDeleteTarefa = (idTarefa) => {
        axios.delete(`https://localhost:7198/api/TarefaDisciplina/${idTarefa}`)
            .then(() => {
                setAtividades(atividades.filter(atividade => atividade.idTarefa !== idTarefa));
            })
            .catch(err => console.error('Erro ao excluir a tarefa:', err));
    };

    // Agrupar as atividades por módulo
    const atividadesPorModulo = atividades.reduce((acc, atividade) => {
        const moduloExistente = acc.find(item => item.modulo === atividade.modulo);
        if (moduloExistente) {
            moduloExistente.itens.push(atividade);
        } else {
            acc.push({ modulo: atividade.modulo, itens: [atividade] });
        }
        return acc;
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div className="container">
            <h1 className="titulo mb-5">Painel de Controle</h1>
            <div>
                <button className="m-4 btn btn-success" onClick={handleShowModal}>
                    Adicionar Tarefa
                </button>
            </div>

            {/* Accordion das atividades agrupadas por módulo */}
            <div className="accordion mb-5" id="accordionExample">
                {atividadesPorModulo.map((modulo, index) => (
                    <div key={index} className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${modulo.modulo.replace(' ', '-')}`}
                                aria-expanded="true"
                                aria-controls={`collapse${modulo.modulo.replace(' ', '-')}`}
                            >
                                {`Módulo ${modulo.modulo}`}
                            </button>

                        </h2>
                        <div id={`collapse${modulo.modulo.replace(' ', '-')}`} className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <ul className="list-group">
                                    {modulo.itens.map(atividade => (
                                        <li key={atividade.idTarefa} className="list-group-item d-flex justify-content-between align-items-center">
                                            <a href={atividade.linkArquivoTarefa}><p>Disponível até {atividade.dataEntrega} | {atividade.valor} pts</p></a>
                                            <div>
                                                <button className="btn btn-primary ms-2" onClick={() => handleEditTarefa(atividade)}>
                                                    <i className="fa-regular fa-pen-to-square"></i>
                                                </button>
                                                <button className="btn btn-danger ms-2" onClick={() => handleDeleteTarefa(atividade.idTarefa)}>
                                                    <i className="fa-regular fa-trash-can"></i>
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal para adicionar ou editar tarefa */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{novaTarefa.idTarefa ? 'Editar Tarefa' : 'Adicionar Tarefa'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-3">
                            <label htmlFor="moduloInput" className="form-label">Módulo</label>
                            <input
                                type="text"
                                className="form-control"
                                id="moduloInput"
                                name="modulo"
                                value={novaTarefa.modulo}
                                onChange={handleInputChange}
                                placeholder="#"
                            />
                        </div>

                        <div className="col-9">
                            <label htmlFor="tituloInput" className="form-label">Título</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tituloInput"
                                name="titulo"
                                value={novaTarefa.titulo}
                                onChange={handleInputChange}
                                placeholder="Título da tarefa"
                            />
                        </div>

                        <div className="col-6">
                            <label htmlFor="valorInput" className="form-label">Valor</label>
                            <input
                                type="number"
                                className="form-control"
                                id="valorInput"
                                name="valor"
                                value={novaTarefa.valor}
                                onChange={handleInputChange}
                                placeholder="Ex: 10"
                            />
                        </div>

                        <div className="col-6">
                            <label htmlFor="dataEntregaInput" className="form-label">Data de entrega</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dataEntregaInput"
                                name="dataEntrega"
                                value={novaTarefa.dataEntrega}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="col-12">
                            <label htmlFor="descricaoInput" className="form-label">Link Tarefa</label>
                            <input
                                type="text"
                                className="form-control"
                                id="descricaoInput"
                                name="linkArquivoTarefa"
                                value={novaTarefa.linkArquivoTarefa}
                                onChange={handleInputChange}
                                rows="3"
                                placeholder="Descrição da tarefa"
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleSaveTarefa}>
                        {novaTarefa.idTarefa ? 'Atualizar Tarefa' : 'Salvar Tarefa'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
