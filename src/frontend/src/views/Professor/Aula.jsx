import { Link } from 'react-router-dom';  // Importando Link para navegação
import '../../styles/menuUsuarios.css';    // Importando os estilos

export default function AulaProf() {
    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-between" style={{ maxWidth: '80%' }}>
                    <h2 className="mb-5">Conteúdo da Disciplina</h2>
                    <a href="#" className="fs-1"><i className="bi bi-file-earmark-arrow-down"></i></a>
                </div>

                <div className="videoaula">
                    <video className="w-100" controls muted>
                        <source src="video/videoteste.mp4" type="video/mp4" />
                    </video>
                </div>

                <div className="d-flex justify-content-between mt-3" style={{ maxWidth: '80%' }}>
                    <Link to="#" className="btn btn-outline-primary">
                        <i className="bi bi-arrow-left"></i> Aula Anterior
                    </Link>

                    <Link to="#" className="btn btn-outline-primary">
                        Próxima Aula <i className="bi bi-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </>
    );
}
