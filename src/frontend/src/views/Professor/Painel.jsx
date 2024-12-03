import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Navegação com React Router
import axios from 'axios'; // Biblioteca para requisições HTTP
import '../../styles/menuUsuarios.css'; // Estilos

export default function ControleProf() {
    // Estado para armazenar as disciplinas
    const [disciplinas, setDisciplinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Função para buscar as disciplinas da API
    useEffect(() => {
        const fetchDisciplinas = async () => {
            try {
                const response = await axios.get('https://localhost:7198/api/Disciplina'); // URL da sua API
                setDisciplinas(response.data); // Armazenar os dados no estado
                setLoading(false); // Desativar o estado de carregamento
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchDisciplinas();
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
                            <Link to={`disciplina`} style={{ height: '300px' }}>
                                <div
                                    style={{
                                        backgroundColor: 'blue', // Cor de fundo desejada
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
