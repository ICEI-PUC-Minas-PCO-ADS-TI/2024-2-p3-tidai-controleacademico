import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import api from '../../api/api'; // Supondo que você tenha a instância da API configurada

const UsuarioDisciplina = () => {
    const [curso, setCurso] = useState(0);
    const [cursos, setCursos] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [disciplinasSelecionadas, setDisciplinasSelecionadas] = useState([]);
    const [matricula, setMatricula] = useState(1001); // Exemplo de matrícula do usuário

    // Carregar a lista de cursos ao montar o componente
    useEffect(() => {
        const carregarCursos = async () => {
            try {
                const response = await api.get('Curso'); // Requisição para pegar os cursos
                const cursosFiltrados = response.data.filter(curso => curso.idCursos !== 0); // Filtra cursos com idCursos = 0
                setCursos(cursosFiltrados);
            } catch (error) {
                console.error('Erro ao carregar cursos:', error);
            }
        };
        carregarCursos();
    }, []);

    // Carregar as disciplinas quando um curso é selecionado
    useEffect(() => {
        if (curso !== 0) {
            carregarDisciplinas(curso); // Carrega as disciplinas ao selecionar um curso
        }
    }, [curso]);

    // Função para carregar as disciplinas do curso
    const carregarDisciplinas = async (idCurso) => {
        try {
            const response = await api.get('Disciplina');
            const todasDisciplinas = response.data;
            const disciplinasDoCurso = todasDisciplinas.filter(disciplina => disciplina.idCurso === idCurso);
            setDisciplinas(disciplinasDoCurso);
        } catch (error) {
            console.error('Erro ao carregar disciplinas:', error);
        }
    };

    // Função para lidar com o curso selecionado
    const handleCursoChange = (e) => {
        setCurso(Number(e.target.value));
    };

    // Função para lidar com a seleção das disciplinas
    const handleDisciplinaChange = (e, idDisciplina) => {
        if (e.target.checked) {
            setDisciplinasSelecionadas([...disciplinasSelecionadas, idDisciplina]);
        } else {
            setDisciplinasSelecionadas(disciplinasSelecionadas.filter(id => id !== idDisciplina));
        }
    };

    // Função para enviar as disciplinas selecionadas
    const handleSubmit = async () => {
        const body = {
            matricula: matricula,
            idDisciplinas: disciplinasSelecionadas
        };

        try {
            const response = await api.post('/usuario/disciplinas', body); // Envia as disciplinas para a API
            console.log('Disciplinas enviadas com sucesso:', response);
        } catch (error) {
            console.error('Erro ao enviar disciplinas:', error);
        }
    };

    return (
        <div>
            <form>
                <div className="col-12 bg-light">
                    <label htmlFor="curso" className="form-label">Curso</label>
                    <select id="curso" className="form-select" onChange={handleCursoChange}>
                        <option value={0}>Selecione</option>
                        {cursos.length > 0 ? (
                            cursos.map((curso) => (
                                <option key={curso.idCursos} value={curso.idCursos}>
                                    {curso.nome}
                                </option>
                            ))
                        ) : (
                            <option disabled>Carregando cursos...</option>
                        )}
                    </select>

                    {/* Lista de disciplinas agrupadas por semestre */}
                    {curso !== 0 && (
                        <div className="row mt-3">
                            {disciplinas.length > 0 ? (
                                disciplinas.map((disciplina) => (
                                    <div className="col-6" key={disciplina.idDisciplina}>
                                        <h6>{disciplina.semestre}° Semestre</h6>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                role="switch"
                                                id={`flexSwitchCheck${disciplina.idDisciplina}`}
                                                onChange={(e) => handleDisciplinaChange(e, disciplina.idDisciplina)}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor={`flexSwitchCheck${disciplina.idDisciplina}`}
                                            >
                                                {disciplina.nome}
                                            </label>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Carregando disciplinas...</p>
                            )}
                        </div>
                    )}
                </div>
            </form>
            
            <div className="mt-3">
                <Button variant="primary" onClick={handleSubmit}>
                    Enviar Disciplinas
                </Button>
            </div>
        </div>
    );
};

export default UsuarioDisciplina;
