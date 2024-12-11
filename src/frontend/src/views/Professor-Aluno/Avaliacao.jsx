import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import '../../styles/menuUsuarios.css';
import { useLocation } from 'react-router-dom'; // Para pegar o idTarefa da navegação

export default function Avaliacao() {

    const [nomeUsuario, setNomeUsuario] = useState('');
    const { state } = useLocation(); // Pegando o idTarefa passado via state
    const idTarefa = state?.idTarefa; // idTarefa passado por state

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (usuario) {
            setNomeUsuario(usuario.matricula);
            setNomeUsuario(usuario.tipo);
        }
    }, []);

    const [entregas, setEntregas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [novaEntrega, setNovaEntrega] = useState({
        idEntrega: 0,
        idTarefa: idTarefa || 0, // Usando idTarefa do state
        matricula: nomeUsuario || 0, // Usando matricula do usuário
        dataEntrega: '', // Data q o aluno enviar o form
        arquivo: '',
        nota: 0,
        idTarefaNavigation: null,
        matriculaNavigation: null
    });

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [entregaParaExcluir, setEntregaParaExcluir] = useState(null);

    useEffect(() => {
        if (idTarefa) {
            axios.get(`https://localhost:7198/api/EntregarTarefa`)
                .then(response => {
                    setEntregas(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [idTarefa]);

    const handleShowModal = (entrega = null) => {
        if (entrega) {
            setNovaEntrega({ ...entrega });
        } else {
            setNovaEntrega({
                idEntrega: 0,
                idTarefa: idTarefa || 0,
                matricula: nomeUsuario || 0,
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

    // Novo handleTextChange para lidar com o valor da área de texto
    const handleTextChange = (e) => {
        setNovaEntrega({
            ...novaEntrega,
            arquivo: e.target.value, // Salvando o texto digitado na área de texto
        });
    };

    const handleSaveEntrega = () => {
        const payload = { ...novaEntrega };

        if (novaEntrega.idEntrega) {
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

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <>
            {nomeUsuario === 'Professor' && (
                <div className="container">
                    {/* Lista as entregas filtradas pela idTarefa */}
                    <ul className="list-group">
                        {entregas.filter(entrega => entrega.idTarefa === idTarefa).map(entrega => (
                            <li key={entrega.idEntrega} className="list-group-item d-flex justify-content-between align-items-center">
                                <p>{`Matrícula: ${entrega.matricula}`}</p>
                                <Button onClick={() => handleShowModal(entrega)}>Avaliar</Button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {nomeUsuario === 'Aluno' && (
                <div className="container">
                    {/* Botão para o aluno acessar o modal de entrega da tarefa */}
                    <button
                        className="btn btn-success"
                        onClick={() => handleShowModal({
                            idEntrega: 0, // Nova entrega (id zero para identificar que é uma nova submissão)
                            idTarefa: idTarefa, // ID da tarefa passada pelo state
                            matricula: nomeUsuario, // Matrícula do aluno logado
                            dataEntrega: '', // Data será preenchida no backend ou no envio
                            arquivo: '', // Conteúdo a ser preenchido pelo aluno
                            nota: 0, // Nota padrão zero, só para inicializar
                            idTarefaNavigation: null,
                            matriculaNavigation: null,
                        })}
                    >
                        Entregar Tarefa
                    </button>
                </div>
            )}




            {/* Modal para adicionar ou editar entrega */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{novaEntrega.idEntrega ? 'Editar Entrega' : 'Adicionar Entrega'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-12">
                            <label htmlFor="arquivoInput" className="form-label">Resposta</label>
                            <textarea
                                className="form-control"
                                id="arquivoInput"
                                name="arquivo"
                                readOnly={nomeUsuario === 'Professor'}
                                rows="6" // Definindo a quantidade de linhas visíveis da área de texto
                                onChange={handleTextChange} // Usando a função para tratar o texto
                                placeholder="Digite sua resposta aqui..."
                                value={novaEntrega.arquivo} // Garantindo que o valor da área de texto é controlado
                            />
                        </div>

                        {nomeUsuario === 'Professor' && (
                            <div className="col-12">
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
                        )}

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
        </>
    );
}
