import React from 'react';

const CursoLista = (props) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Nível</th>
          <th scope="col">Tipo</th>
          <th scope="col">Disciplinas</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {props.cursos.map((curso) => (
          <tr key={curso.idCursos}>
            <td>{curso.nome}</td>
            <td>{curso.nivel}</td>
            <td>{curso.tipo}</td>
            <td>
            <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => props.abrirModalDisciplinas(curso.idCursos)} // Passa o idCurso
              >
                Disciplinas
              </button>
            </td>
            <td>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => props.pegarCurso(curso.idCursos)}
              >
                <i className="fa-regular fa-pen-to-square"></i>
              </button>
            </td>
            <td>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => props.handleConfirmModal(curso.idCursos)}
              >
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CursoLista;
