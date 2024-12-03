import { Link } from 'react-router-dom';  // Importando Link para navegação
import '../../styles/menuUsuarios.css';    // Importando os estilos

export default function DisciplinaProf() {
    return (
        <>
            <div>
                <p>DisciplinaProf</p>
                <div className="accordion mb-5" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                            >
                                Módulo 1
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <ul className="list-group" style={{ width: '100%' }}>
                                    <li className="list-group-item">
                                        <Link to="/aula">1. Conteúdo da disciplina</Link>
                                    </li>
                                    <li className="list-group-item">
                                        <Link to="/aula">2. Conteúdo da disciplina</Link>
                                    </li>
                                    <li className="list-group-item">
                                        <Link to="/aula">3. Conteúdo da disciplina</Link>
                                    </li>
                                    <li className="list-group-item">
                                        <Link to="/aula">4. Conteúdo da disciplina</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
