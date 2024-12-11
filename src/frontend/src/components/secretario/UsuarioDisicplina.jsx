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

            // Agrupar as disciplinas por semestre
            const disciplinasAgrupadas = disciplinasDoCurso.reduce((acc, disciplina) => {
                const semestre = disciplina.semestre;
                if (!acc[semestre]) {
                    acc[semestre] = [];
                }
                acc[semestre].push(disciplina);
                return acc;
            }, {});

            // Converte o objeto em um array de semestres ordenados
            const disciplinasOrdenadas = Object.keys(disciplinasAgrupadas).sort().map(semestre => ({
                semestre: semestre,
                disciplinas: disciplinasAgrupadas[semestre]
            }));

            setDisciplinas(disciplinasOrdenadas);
        } catch (error) {
            console.error('Erro ao carregar disciplinas:', error);
        }
    };

    // Função para lidar com o curso selecionado
    const handleCursoChange = (e) => {
        setCurso(Number(e.target.value));
    };

    // Função para adicionar ou remover disciplina
    const handleDisciplinaAction = (action, idDisciplina) => {
        if (action === 'adicionar') {
            setDisciplinasSelecionadas(prev => [...prev, idDisciplina]);
        } else if (action === 'remover') {
            setDisciplinasSelecionadas(prev => prev.filter(id => id !== idDisciplina));
        }
    };

    const handleSubmit = async () => {
        const disciplinasParaAdicionar = disciplinasSelecionadas.map(id => ({
            matricula: matricula,
            idDisciplinas: id,
            idDisciplinasNavigation: null,
            matriculaNavigation: null,
            presencas: []  // Enviando um array vazio, conforme esperado
        }));

        const disciplinasParaRemover = disciplinas
            .flatMap(grupo => grupo.disciplinas)
            .filter(disciplina => !disciplinasSelecionadas.includes(disciplina.idDisciplina))
            .map(disciplina => ({
                matricula: matricula,
                idDisciplinas: disciplina.idDisciplina,
                idDisciplinasNavigation: null,
                matriculaNavigation: null,
                presencas: []  // Enviando um array vazio, conforme esperado
            }));

        // Agora, criar o corpo para enviar para a API
        const body = {
            matricula: matricula,
            disciplinasParaAdicionar: disciplinasParaAdicionar,
            disciplinasParaRemover: disciplinasParaRemover
        };

        try {
            // Enviar as disciplinas para a API
            const response = await api.post('DisciplinasUsuario', body);
            console.log('Disciplinas enviadas com sucesso:', response);
        } catch (error) {
            console.error('Erro ao enviar disciplinas:', error.response ? error.response.data : error);
        }
    };

    return (

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
                            disciplinas.map((grupo) => (
                                <div key={grupo.semestre} className="col-12">
                                    <h6>{grupo.semestre}° Semestre</h6>
                                    {grupo.disciplinas.map((disciplina) => (
                                        <div className="d-flex justify-content-between align-items-center" key={disciplina.idDisciplina}>
                                            <span>{disciplina.nome}</span>
                                            <div>
                                                <Button
                                                    variant="success"
                                                    onClick={() => handleDisciplinaAction('adicionar', disciplina.idDisciplina)}
                                                    disabled={disciplinasSelecionadas.includes(disciplina.idDisciplina)}
                                                >
                                                    Adicionar
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleDisciplinaAction('remover', disciplina.idDisciplina)}
                                                    disabled={!disciplinasSelecionadas.includes(disciplina.idDisciplina)}
                                                    className="ms-2"
                                                >
                                                    Remover
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <p>Carregando disciplinas...</p>
                        )}
                    </div>
                )}
            </div>
        </form>

    );
};

export default UsuarioDisciplina;
