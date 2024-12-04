import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const usuarioInicial = {
    matricula: 0,
    nome: '',
    cpf: '',
    email: '',
    endereco: '',
    tipo: '',
    senha: '',
    idCurso: 0,
    idCursoNavigation: null,
};

export default function UsuarioForm(props) {
    const calcularProximaMatricula = () => {
        if (props.usuarios && props.usuarios.length > 0) {
            const maiorMatricula = Math.max(...props.usuarios.map((u) => u.matricula));
            return maiorMatricula + 1;
        }
        return 1;
    };

    const usuarioAtual = () => {
        if (props.usuarioSelecionado && props.usuarioSelecionado.matricula !== 0) {
            return props.usuarioSelecionado;
        } else {
            return {
                ...usuarioInicial,
                matricula: calcularProximaMatricula(),
            };
        }
    };

    const [usuario, setUsuario] = useState(usuarioAtual());

    useEffect(() => {
        if (props.usuarioSelecionado && props.usuarioSelecionado.matricula !== 0) {
            setUsuario(props.usuarioSelecionado);
        } else {
            setUsuario({
                ...usuarioInicial,
                matricula: calcularProximaMatricula(),
            });
        }
    }, [props.usuarioSelecionado, props.usuarios]);

    const inputTextHandler = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !usuario.nome.trim() ||
            !usuario.cpf.trim() ||
            usuario.tipo === '' ||
            !usuario.email.trim() ||
            !usuario.endereco.trim() ||
            !usuario.senha.trim()
        ) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const usuarioParaEnvio = { ...usuario, idCurso: 0 };

        if (props.usuarioSelecionado && props.usuarioSelecionado.matricula !== 0) {
            props.atualizarUsuario(usuarioParaEnvio);
        } else {
            props.addUsuario(usuarioParaEnvio);
        }

        setUsuario({
            ...usuarioInicial,
            matricula: calcularProximaMatricula(),
        });
        window.location.reload();
    };

    const handleCancelar = (e) => {
        e.preventDefault();
        props.cancelarUsuario();
        setUsuario({
            ...usuarioInicial,
            matricula: calcularProximaMatricula(),
        });
    };

    return (
        <>
            <form className="row g-3" onSubmit={handleSubmit}>
                {/* Nome */}
                <div className="col-12">
                    <label className="form-label">
                        Nome <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="nome"
                        name="nome"
                        onChange={inputTextHandler}
                        value={usuario.nome}
                        required
                    />
                </div>

                {/* CPF */}
                <div className="col-8">
                    <label className="form-label">
                        CPF <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="cpf"
                        name="cpf"
                        onChange={inputTextHandler}
                        value={usuario.cpf}
                        required
                    />
                </div>

                {/* Tipo */}
                <div className="col-md-4">
                    <label htmlFor="inputState" className="form-label">
                        Tipo <span style={{ color: 'red' }}>*</span>
                    </label>
                    <select
                        id="tipo"
                        className="form-select"
                        name="tipo"
                        onChange={inputTextHandler}
                        value={usuario.tipo || ''} // Puxa o valor do estado corretamente
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="Aluno">Aluno</option>
                        <option value="Professor">Professor</option>
                        <option value="Secretário">Secretário</option>
                    </select>
                </div>

                {/* Email */}
                <div className="col-12">
                    <label htmlFor="inputEmail4" className="form-label">
                        Email <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={inputTextHandler}
                        value={usuario.email}
                        required
                    />
                </div>

                {/* Endereço */}
                <div className="col-8">
                    <label className="form-label">
                        Endereço <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="endereco"
                        name="endereco"
                        onChange={inputTextHandler}
                        value={usuario.endereco}
                        required
                    />
                </div>

                {/* Senha */}
                <div className="col-4">
                    <label className="form-label">
                        Senha <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="senha"
                        name="senha"
                        onChange={inputTextHandler}
                        value={usuario.senha}
                        required
                    />
                </div>

                {/* Botões */}
                <div className="row mt-4 border-top">
                    <div className="col-6">
                        {usuario.matricula === 0 ? (
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
