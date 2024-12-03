import React from 'react';
import '../../styles/menuUsuarios.css';

const ChamadaProf = () => {
  return (
    <div>
      <form action="#" method="POST">
        <div className="date-picker">
          <label htmlFor="data-chamada">Selecione o dia:</label>
          <input type="date" id="data-chamada" name="data-chamada" required />
        </div>

        <table>
          <thead>
            <tr>
              <th>Nome do Aluno</th>
              <th>Presente</th>
              <th>Ausente</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 12 }, (_, index) => (
              <tr key={index}>
                <td>Aluno {index + 1}</td>
                <td>
                  <input type="radio" name={`presenca${index + 1}`} value="presente" />
                </td>
                <td>
                  <input type="radio" name={`presenca${index + 1}`} value="ausente" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit">Registrar Presença</button>
      </form>
    </div>
  );
};

export default ChamadaProf;
