import { Link } from 'react-router-dom';  // Importando o Link para navegação
import '../../styles/menuUsuarios.css';  // Importando os estilos

export default function ControleProf() {
    return (
        <>
            <div className="container">
                <h1 className="titulo mb-5">Painel de Controle</h1>
                <div className="row">
                    <div className="col-md-3 mb-5 cardgeral">
                        <div className="card" style={{ width: '100%', height: '300px' }}>
                            {/* Usando Link do react-router-dom para navegação */}
                            <Link to="disciplina" style={{ height: '300px' }}>
                                <img 
                                    src="https://prioridadeabsoluta.org.br/wp-content/uploads/2018/07/justiccca7a-850x425.png"
                                    className="card-img-top" 
                                    alt="Imagem da Disciplina" 
                                    style={{ opacity: '90%', height: '150px' }} 
                                />
                                <div className="card-body d-flex flex-column justify-content-between text-center">
                                    <h5 className="card-title">Introdução ao Estudo do Direito</h5>
                                    <p className="card-text">x° Semestre</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
