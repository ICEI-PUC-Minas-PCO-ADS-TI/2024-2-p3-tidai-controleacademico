import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';

const ChamadaProf = () => {
    const [alunos, setAlunos] = useState([]);
    const [dataChamada, setDataChamada] = useState('');
    const [presencas, setPresencas] = useState({});
    const [showModal, setShowModal] = useState(false);

    // Puxar lista de alunos da API
    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const response = await axios.get('https://localhost:7198/api/Alunos'); // Atualize para a URL correta da sua API
                setAlunos(response.data);
            } catch (error) {
                console.error("Erro ao carregar alunos", error);
            }
        };

        fetchAlunos();
    }, []);

    // Função para alterar o estado de presença
    const handlePresencaChange = (alunoId, status) => {
        setPresencas((prevPresencas) => ({
            ...prevPresencas,
            [alunoId]: status
        }));
    };

    // Função para registrar a presença
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const presencasData = {
                data: dataChamada,
                presencas: Object.keys(presencas).map((id) => ({
                    alunoId: id,
                    status: presencas[id]
                }))
            };
            await axios.post('https://localhost:7198/api/Presenca', presencasData);
            alert('Presença registrada com sucesso!');
        } catch (error) {
            console.error('Erro ao registrar presença', error);
            alert('Erro ao registrar presença');
        }
    };

    return (
        <div>
            <header>
                <h1>Controle de Presença</h1>
                <p>Bem-vindo, Professor(a)!</p>
            </header>

            <main>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    Registrar Presença
                </Button>

                {/* Modal para registrar presença */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Registrar Presença</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="data-chamada">
                                <Form.Label>Selecione o dia:</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={dataChamada}
                                    onChange={(e) => setDataChamada(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <table className="table table-bordered mt-3">
                                <thead>
                                    <tr>
                                        <th>Nome do Aluno</th>
                                        <th>Presente</th>
                                        <th>Ausente</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alunos.map((aluno) => (
                                        <tr key={aluno.id}>
                                            <td>{aluno.nome}</td>
                                            <td>
                                                <input
                                                    type="radio"
                                                    name={`presenca${aluno.id}`}
                                                    value="presente"
                                                    onChange={() => handlePresencaChange(aluno.id, 'presente')}
                                                    checked={presencas[aluno.id] === 'presente'}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="radio"
                                                    name={`presenca${aluno.id}`}
                                                    value="ausente"
                                                    onChange={() => handlePresencaChange(aluno.id, 'ausente')}
                                                    checked={presencas[aluno.id] === 'ausente'}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <Button variant="success" type="submit">
                                Registrar Presença
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </main>

            <footer>
                <p>&copy; 2024 Sistema de Gerenciamento Acadêmico</p>
            </footer>
        </div>
    );
};

export default ChamadaProf;
