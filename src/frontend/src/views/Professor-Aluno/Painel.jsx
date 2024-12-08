import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/menuUsuarios.css';

export default function PainelControle() {
    const [disciplinas, setDisciplinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDisciplinasDoUsuario = async () => {
            try {
                const usuario = JSON.parse(localStorage.getItem('usuario'));
                const usuarioMatricula = usuario ? usuario.matricula : null;

                if (!usuarioMatricula) {
                    setError('Matrícula do usuário não encontrada.');
                    setLoading(false);
                    return;
                }

                const responseRelacao = await axios.get('https://localhost:7198/api/DisciplinasUsuario');
                const relacoes = responseRelacao.data.filter(
                    (relacao) => relacao.matricula === parseInt(usuarioMatricula)
                );

                const idsDisciplinas = relacoes.map((relacao) => relacao.idDisciplinas);
                const responseDisciplinas = await axios.get('https://localhost:7198/api/Disciplina');
                const todasDisciplinas = responseDisciplinas.data;

                const disciplinasDoUsuario = todasDisciplinas.filter((disciplina) =>
                    idsDisciplinas.includes(disciplina.idDisciplinas)
                );

                setDisciplinas(disciplinasDoUsuario);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchDisciplinasDoUsuario();
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div className="container">
            <h1 className="titulo mb-5">Painel de Controle</h1>
            <div className="row">
                {disciplinas.map((disciplina) => (
                    <div key={disciplina.idDisciplinas} className="col-md-3 mb-5 cardgeral">
                        <div className="card" style={{ width: '100%', height: '300px' }}>
                            <Link to="/professor/disciplina" state={{ disciplinaId: disciplina.idDisciplinas }} style={{ height: '300px' }}>
                                <div
                                    style={{
                                        backgroundColor: 'blue',
                                        height: '150px',
                                        opacity: '90%',
                                    }}
                                ></div>

                                <div className="card-body d-flex flex-column justify-content-between text-center">
                                    <h5 className="card-title">{disciplina.nome}</h5>
                                    <p className="card-text">{disciplina.semestre}° Semestre</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
