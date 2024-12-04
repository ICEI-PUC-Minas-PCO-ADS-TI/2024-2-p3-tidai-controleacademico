import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const cursoInicial = {
    idCursos: 0,
    nome: '',
    nivel: '',
    tipo: '',
};

export default function CursoForm(props) {
    const cursoAtual = () => {
        if (props.cursoSelecionado.idCursos !== 0) {
            return props.cursoSelecionado;
        } else {
            return cursoInicial;
        }
    };

    const [curso, setCurso] = useState(cursoAtual());

    useEffect(() => {
        if (props.cursoSelecionado.idCursos !== 0) setCurso(props.cursoSelecionado);
    }, [props.cursoSelecionado]);

    const inputTextHandler = (e) => {
        const { name, value } = e.target;

        setCurso({ ...curso, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Verifica se o nome está definido e se não está vazio
        if (!curso.nome || curso.nome.trim() === '' || curso.nivel === '' || curso.tipo === '') {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
    
        // Verifique se está atualizando ou adicionando
        if (props.cursoSelecionado.idCursos !== 0) {
            props.atualizarCurso(curso);
        } else {
            props.addCurso(curso);
        }
    
        setCurso(cursoInicial);
        window.location.reload();
    };
    

    const handleCancelar = (e) => {
        e.preventDefault();

        props.cancelarCurso();
        setCurso(cursoInicial);
    };

    return (
        <>
            <form className="row g-3" onSubmit={handleSubmit}>
                {/* Nome */}
                <div className="col-12">
                    <label className="form-label">
                        Nome do Curso <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="nome"
                        name="nome"
                        onChange={inputTextHandler}
                        value={curso.nome}
                        required
                    />
                </div>
                {/* Nivel */}
                <div className="col-md-6">
                    <label htmlFor="nivel" className="form-label">
                        Nivel <span style={{ color: 'red' }}>*</span>
                    </label>
                    <select
                        id="nivel"
                        className="form-select"
                        name="nivel"
                        onChange={inputTextHandler}
                        value={curso.nivel}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="Graduação">Graduação</option>
                        <option value="PósGraduação">PósGraduação</option>
                        <option value="Doutorado">Doutorado</option>
                        <option value="Mestrado">Mestrado</option>
                    </select>
                </div>
                {/* Tipo */}
                <div className="col-md-6">
                    <label htmlFor="tipo" className="form-label">
                        Tipo <span style={{ color: 'red' }}>*</span>
                    </label>
                    <select
                        id="tipo"
                        className="form-select"
                        name="tipo"
                        onChange={inputTextHandler}
                        value={curso.tipo}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Ead">EAD</option>
                        <option value="Misto">Misto</option>
                    </select>
                </div>

                {/* Botões */}
                <div className="row mt-4 border-top">
                    <div className="col-6">
                        {curso.idCursos === 0 ? (
                            <Button variant="secondary" onClick={props.handleClose}>
                                Fechar
                            </Button>
                        ) : (
                            <Button variant="secondary" onClick={handleCancelar}>
                                Cancelar
                            </Button>
                        )}
                    </div>
                    <div className="col-6">
                        <Button variant="primary" type="submit">
                            Salvar
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
}
