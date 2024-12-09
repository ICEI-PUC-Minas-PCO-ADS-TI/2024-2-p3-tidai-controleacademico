import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../../styles/menuUsuarios.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Disciplinas() {
    const location = useLocation();
    const { disciplinaId } = location.state || {};

    const [disciplina, setDisciplina] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [conteudos, setConteudos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [novoConteudo, setNovoConteudo] = useState({
        idMateria: null,
        modulo: '',
        titulo: '',
        linkVideoaula: '',
        descricao: '',
        idDisciplinas: disciplinaId,
    });
    const [conteudoEditar, setConteudoEditar] = useState(null);
    const [conteudoExcluir, setConteudoExcluir] = useState(null);
    const [nomeUsuario, setNomeUsuario] = useState('');

    // Quando o componente for montado, pega o nome do usuário do localStorage
    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (usuario) {
            setNomeUsuario(usuario.tipo);  // Armazena o tipo do usuário no estado
        }
    }, []);  // O useEffect será chamado apenas uma vez, quando o componente for montado
    useEffect(() => {
        const fetchDisciplina = async () => {
            try {
                const response = await axios.get('https://localhost:7198/api/Disciplina');
                const disciplinaFiltrada = response.data.find(disciplina => disciplina.idDisciplinas === parseInt(disciplinaId));
                setDisciplina(disciplinaFiltrada);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        const fetchConteudos = async () => {
            try {
                const responseConteudos = await axios.get('https://localhost:7198/api/MaterialDisciplina');
                const filtrados = responseConteudos.data.filter(conteudo => conteudo.idDisciplinas === parseInt(disciplinaId));
                setConteudos(filtrados);
            } catch (err) {
                console.error('Erro ao carregar conteúdos', err);
            }
        };

        if (disciplinaId) {
            fetchDisciplina();
            fetchConteudos();
        }
    }, [disciplinaId]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    const salvarConteudo = () => {
        let conteudoParaSalvar = {
            ...novoConteudo,
            modulo: parseInt(novoConteudo.modulo, 10), // Converter para número
            img: novoConteudo.img || '', // Campo opcional
            idDisciplinasNavigation: null, // Se necessário
        };

        // Remova o idMateria ao criar um novo conteúdo
        if (!conteudoEditar) {
            delete conteudoParaSalvar.idMateria;
        }

        console.log('Dados enviados para salvar:', conteudoParaSalvar);

        if (conteudoEditar) {
            // Requisição PUT para editar (não usando o ID na URL, mandando no corpo)
            axios.put('https://localhost:7198/api/MaterialDisciplina', conteudoParaSalvar) // Removido o ID da URL
                .then(response => {
                    console.log('Resposta do PUT:', response.data);
                    setConteudos(conteudos.map(item =>
                        item.idMateria === conteudoEditar.idMateria ? response.data : item
                    ));
                    limparModal();
                })

        } else {
            // Requisição POST para criar
            axios.post('https://localhost:7198/api/MaterialDisciplina', conteudoParaSalvar)
                .then(response => {
                    console.log('Resposta do POST:', response.data);
                    setConteudos([...conteudos, response.data]);
                    limparModal();
                })
        }
    };

    const limparModal = () => {
        setNovoConteudo({
            idMateria: null, // Sempre inicialize como null
            modulo: '',
            titulo: '',
            linkVideoaula: '',
            descricao: '',
            idDisciplinas: disciplinaId,
            img: '',
            idDisciplinasNavigation: null,
        });
        setShowModal(false);
        setConteudoEditar(null);
    };


    // Função para deletar conteúdo
    const deletarConteudo = () => {
        if (conteudoExcluir) {
            axios.delete(`https://localhost:7198/api/MaterialDisciplina/${conteudoExcluir.idMateria}`)
                .then(() => {
                    setConteudos(conteudos.filter(item => item.idMateria !== conteudoExcluir.idMateria));
                    setShowConfirmDeleteModal(false);
                    setConteudoExcluir(null);
                })
                .catch(err => console.error('Erro ao deletar conteúdo: ', err));
        }
    };

    const editarConteudo = (conteudo) => {
        setConteudoEditar(conteudo); // Define o item atual para edição
        setNovoConteudo({
            ...conteudo,  // Preenche o formulário com os dados existentes
            modulo: conteudo.modulo.toString(),  // Garante que 'modulo' seja tratado como string para o input
            img: conteudo.img || '', // Define 'img' como string vazia se necessário
        });
        setShowModal(true); // Exibe o modal
    };


    const confirmarExclusao = (conteudo) => {
        setConteudoExcluir(conteudo);
        setShowConfirmDeleteModal(true);
    };

    return (
        <>
            <div className="container">
                <h1 className="titulo mb-5">Material da disciplina</h1>
                {nomeUsuario === 'Professor' && (
                    <div>
                        <button className='m-4 btn btn-success' onClick={() => setShowModal(true)}>
                            Incluir Material Disciplina
                        </button>
                    </div>
                )}

                <div className="accordion mb-5" id="accordionExample">
                    {/* Agrupando os conteúdos por módulo */}
                    {conteudos.reduce((acc, conteudo) => {
                        // Agrupando os conteúdos pelo módulo
                        const moduloExistente = acc.find(item => item.modulo === conteudo.modulo);
                        if (moduloExistente) {
                            moduloExistente.itens.push(conteudo);
                        } else {
                            acc.push({ modulo: conteudo.modulo, itens: [conteudo] });
                        }
                        return acc;
                    }, []).map((modulo) => (
                        <div key={modulo.modulo} className="accordion-item">
                            <h2 className="accordion-header d-flex justify-content-between align-items-center" id={`heading${modulo.modulo}`}>
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${modulo.modulo}`} aria-expanded="true" aria-controls={`collapse${modulo.modulo}`}>
                                    {`Módulo ${modulo.modulo}`}
                                </button>
                            </h2>

                            <div id={`collapse${modulo.modulo}`} className="accordion-collapse collapse" aria-labelledby={`heading${modulo.modulo}`} data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <ul className="list-group" style={{ width: "100%" }}>
                                        {/* Renderizando os itens dentro de cada módulo */}
                                        {modulo.itens.map((conteudo) => (
                                            <li key={conteudo.idMateria} className="list-group-item">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <button className="btn btn-link text-start" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseItem${conteudo.idMateria}`} aria-expanded="false" aria-controls={`collapseItem${conteudo.idMateria}`}>
                                                        {conteudo.titulo}
                                                    </button>

                                                    {/* Botões de Editar e Excluir (somente para 'Professor') */}
                                                    {nomeUsuario === 'Professor' && (
                                                        <div>
                                                            <button className="ms-2" onClick={() => editarConteudo(conteudo)}>
                                                                <i className="fa-regular fa-pen-to-square"></i>
                                                            </button>
                                                            <button className="ms-2" onClick={() => confirmarExclusao(conteudo)}>
                                                                <i className="fa-regular fa-trash-can"></i>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Exibição do conteúdo (inicialmente fechado) */}
                                                <div id={`collapseItem${conteudo.idMateria}`} className="collapse">
                                                    <div className="d-flex justify-content-center">
                                                        <iframe width="560" height="315" src={conteudo.linkVideoaula} frameBorder="0" allowFullScreen></iframe>
                                                    </div>
                                                    <div className="p-5 text-center">
                                                        <p>{conteudo.descricao}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}


                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal para adicionar ou editar conteúdo */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{conteudoEditar ? 'Editar Conteúdo' : 'Adicionar Conteúdo'}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <form className="row g-3">
                            <div className="col-3">
                                <label htmlFor="modulo" className="form-label">Módulo</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="modulo"
                                    value={novoConteudo.modulo}
                                    onChange={(e) => setNovoConteudo({ ...novoConteudo, modulo: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="col-9">
                                <label htmlFor="titulo" className="form-label">Título</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="titulo"
                                    value={novoConteudo.titulo}
                                    onChange={(e) => setNovoConteudo({ ...novoConteudo, titulo: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="linkVideoaula" className="form-label">Link Vídeo-Aula</label>
                                <input
                                    type="url"
                                    className="form-control"
                                    id="linkVideoaula"
                                    value={novoConteudo.linkVideoaula}
                                    onChange={(e) => setNovoConteudo({ ...novoConteudo, linkVideoaula: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="descricao" className="form-label">Descrição</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="descricao"
                                    value={novoConteudo.descricao}
                                    onChange={(e) => setNovoConteudo({ ...novoConteudo, descricao: e.target.value })}
                                    required
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-primary" onClick={salvarConteudo}>Salvar</button>
                    </div>
                </div>
            </Modal>

            {/* Modal para confirmar exclusão */}
            <Modal show={showConfirmDeleteModal} onHide={() => setShowConfirmDeleteModal(false)}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirmar Exclusão</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowConfirmDeleteModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <p>Tem certeza que deseja excluir este conteúdo?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmDeleteModal(false)}>Cancelar</button>
                        <button type="button" className="btn btn-danger" onClick={deletarConteudo}>Excluir</button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
