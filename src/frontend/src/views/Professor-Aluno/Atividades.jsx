import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';  // Importar useLocation para acessar o state
import '../../styles/menuUsuarios.css';

export default function Atividade() {
    const [atividades, setAtividades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nomeUsuario, setNomeUsuario] = useState('');

    const location = useLocation();  // Obter o estado da localização (Link)
    const disciplinaId = location.state?.disciplinaId || 1;  // Pegar o idDisciplinas passado no Link ou 1 se não tiver

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (usuario) {
            setNomeUsuario(usuario.tipo);
        }
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [novaTarefa, setNovaTarefa] = useState({
        idTarefa: null,
        titulo: '',
        modulo: '',
        valor: 0,
        dataEntrega: '',
        linkArquivoTarefa: '',
        idDisciplinas: disciplinaId, // Usando o idDisciplinas da URL
        idDisciplinasNavigation: null,
        entregarTarefas: []
    });

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [tarefaParaExcluir, setTarefaParaExcluir] = useState(null);

    useEffect(() => {
        const fetchAtividades = async () => {
            try {
                const response = await axios.get(`https://localhost:7198/api/TarefaDisciplina?idDisciplina=${disciplinaId}`);
                setAtividades(response.data);  // Aqui as atividades já são filtradas pela disciplina
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchAtividades();
    }, [disciplinaId]);

    const handleShowModal = () => {
        setNovaTarefa({
            idTarefa: null,
            titulo: '',
            modulo: '',
            valor: 0,
            dataEntrega: '',
            linkArquivoTarefa: '',
            idDisciplinas: disciplinaId, // Usando o idDisciplinas da URL
            idDisciplinasNavigation: null,
            entregarTarefas: []
        });
        setShowModal(true);
    };

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

    const handleSaveTarefa = () => {
        const payload = {
            idTarefa: novaTarefa.idTarefa || 0,
            modulo: novaTarefa.modulo,
            titulo: novaTarefa.titulo,
            valor: novaTarefa.valor,
            dataEntrega: novaTarefa.dataEntrega,
            linkArquivoTarefa: novaTarefa.linkArquivoTarefa,
            idDisciplinas: disciplinaId, // Usando o idDisciplinas da URL
            idDisciplinasNavigation: novaTarefa.idDisciplinasNavigation,
            EntregarTarefas: novaTarefa.entregarTarefas || [],
        };

        if (novaTarefa.idTarefa) {
            axios.put(`https://localhost:7198/api/TarefaDisciplina/${novaTarefa.idTarefa}`, payload, {
                headers: { 'Content-Type': 'application/json' },
            })
                .then(response => {
                    setAtividades(atividades.map(atividade =>
                        atividade.idTarefa === novaTarefa.idTarefa ? response.data : atividade
                    ));
                    handleCloseModal();
                })
                .catch(err => {
                    console.error('Erro ao atualizar a tarefa:', err.response || err.message);
                });
        } else {
            axios.post('https://localhost:7198/api/TarefaDisciplina', payload, {
                headers: { 'Content-Type': 'application/json' },
            })
                .then(response => {
                    setAtividades([...atividades, response.data]);
                    handleCloseModal();
                })
                .catch(err => {
                    console.error('Erro ao salvar a tarefa:', err.response || err.message);
                });
        }
    };

    const handleEditTarefa = (atividade) => {
        setNovaTarefa({
            ...atividade,
        });
        setShowModal(true);
    };

    const handleShowDeleteModal = (atividade) => {
        setTarefaParaExcluir(atividade);
        setShowDeleteModal(true);
    };

    const handleDeleteTarefa = () => {
        if (tarefaParaExcluir) {
            axios.delete(`https://localhost:7198/api/TarefaDisciplina/${tarefaParaExcluir.idTarefa}`)
                .then(() => {
                    setAtividades(atividades.filter(atividade => atividade.idTarefa !== tarefaParaExcluir.idTarefa));
                    setShowDeleteModal(false);
                })
                .catch(err => console.error('Erro ao excluir a tarefa:', err));
        }
    };

    // Filtrando as atividades para garantir que estamos exibindo apenas as da disciplina correta
    const atividadesFiltradas = atividades.filter(atividade => atividade.idDisciplinas === disciplinaId);

    // Agrupando as atividades por módulo
    const atividadesPorModulo = atividadesFiltradas.reduce((acc, atividade) => {
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
            <h1 className="titulo mb-5">Painel de Atividades</h1>
            {nomeUsuario === 'Professor' && (
                <div>
                    <button className="m-4 btn btn-success" onClick={handleShowModal}>
                        Adicionar Tarefa
                    </button>
                </div>
            )}

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
                                            <a target="_blank" href={atividade.linkArquivoTarefa}>
                                                <p>Disponível até {atividade.dataEntrega} | {atividade.valor} pts</p>
                                            </a>
                                            {nomeUsuario === 'Professor' && (
                                                <div>
                                                    <button className="btn btn-primary ms-2" onClick={() => handleEditTarefa(atividade)}>
                                                        <i className="fa-regular fa-pen-to-square"></i>
                                                    </button>
                                                    <button className="btn btn-danger ms-2" onClick={() => handleShowDeleteModal(atividade)}>
                                                        <i className="fa-regular fa-trash-can"></i>
                                                    </button>
                                                    {nomeUsuario === 'Professor' && (
                                                        <Link to="/usuario/avaliacao" state={{ idTarefa: atividade.idTarefa }}>
                                                            <button className="btn btn-success ms-2">
                                                                Avaliar Entregas
                                                            </button>
                                                        </Link>
                                                    )}
                                                </div>
                                            )}
                                            {nomeUsuario === 'Aluno' && (
                                                <div>
                                                    <button className="btn btn-success ms-2" onClick={() => handleEditTarefa(atividade)}>
                                                        Entregar Tarefa
                                                    </button>
                                                </div>
                                            )}

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
                                placeholder="Link da tarefa"
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

            {/* Modal de confirmação de exclusão */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Você tem certeza que deseja excluir esta tarefa?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDeleteTarefa}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
