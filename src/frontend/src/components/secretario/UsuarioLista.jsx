import React from 'react';

export default function UsuarioLista(props) {
    function TipoLabel(param) {
        switch (param) {
            case '1': return 'Aluno';
            case '2': return 'Professor';
            case '3': return 'Secretário';
            default: return 'Indefinido';
        }
    }

    return (
        <>
            {props.usuarios.map((usuario) => (
                <tr>
                    <td>{usuario.matricula}</td>
                    <td>{usuario.nome}</td>
                    <td>{usuario.cpf}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.endereco}</td>
                    <td>{usuario.tipo}</td>
                    <td>
                        <button
                            type="button"
                            className={`btn ${usuario.tipo === 'Secretário' ? 'btn btn-outline-secondary' : 'btn-outline-info'}`}
                            onClick={() => {
                                props.handleDisciplinaModal(usuario.matricula); // Chama pegarUsuario
                            }}
                            disabled={usuario.tipo === 'Secretário'} // Desabilita o botão se o tipo for 'Secretario'
                        >
                            Disciplinas
                        </button>
                    </td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => {
                                props.pegarUsuario(usuario.matricula); // Chama pegarUsuario
                            }}
                        >
                            <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                    </td>

                    <td>
                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => props.handleConfirmModal(usuario.matricula)}
                        >
                            <i className="fa-regular fa-trash-can"></i>
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
}
