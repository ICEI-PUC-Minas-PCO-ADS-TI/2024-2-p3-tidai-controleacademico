import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import '../styles/index.css';
import ViewLogin from './login';

export default function ViewIndex() {
    return (
        <div className='body'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">UNIBETIM</Link>
                    <div className="d-flex">
                        <Link to="/login" className="btn btn-primary login-btn">Login Acadêmico</Link>
                    </div>
                </div>
            </nav>

            <section className="hero-section">
                <div className="container">
                    <h1>Bem-vindo à UNIBETIM</h1>
                    <p>Confira as últimas novidades, bolsas e notícias da nossa comunidade acadêmica.</p>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <h2 className="text-center mb-4">Novidades e Notícias</h2>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card card-custom">
                                <img 
                                    src="https://fasam.edu.br/wp-content/uploads/2020/09/Bolsas-de-Estudos-FASAM-1.jpg" 
                                    className="card-img-top" 
                                    alt="Imagem sobre bolsas de estudo"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Bolsas de Estudo</h5>
                                    <p className="card-text">Conheça as oportunidades de bolsas de estudo oferecidas para este semestre.</p>
                                    <Link to="/bolsas" className="btn btn-primary">Saiba Mais</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card card-custom">
                                <img 
                                    src="https://blog.even3.com.br/wp-content/uploads/2022/07/icone-materiais-educativos_guia-p-organizacao-de-congressos-1024x1024.png"
                                    className="card-img-top img-fluid"
                                    style={{ maxWidth: '300px', height: 'auto', display: 'block', margin: '0 auto' }} 
                                    alt="Eventos Acadêmicos"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Eventos Acadêmicos</h5>
                                    <p className="card-text">Fique por dentro dos próximos eventos acadêmicos e palestras da faculdade.</p>
                                    <Link to="/eventos" className="btn btn-primary">Saiba Mais</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card card-custom">
                                <img 
                                    src="https://assets-blog.pagseguro.uol.com.br/wp-content/2021/06/como-guardar-dinheiro-pra-faculdade.jpg" 
                                    className="card-img-top" 
                                    alt="Últimas Notícias"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Últimas Notícias</h5>
                                    <p className="card-text">Veja as últimas notícias da nossa comunidade acadêmica e conquistas de alunos.</p>
                                    <Link to="/noticias" className="btn btn-primary">Saiba Mais</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="text-center py-4 bg-light">
                <div className="container">
                    <img 
                        src="https://static.vecteezy.com/ti/vetor-gratis/p1/15668053-modelo-de-design-de-logotipo-da-faculdade-ilustracaoial-logotipo-da-faculdade-da-universidade-distintivos-emblemas-sinais-estoque-logotipo-do-campus-da-faculdade-gratis-vetor.jpg" 
                        alt="Logo da UNIBETIM" 
                        className="footer-logo mb-3"
                    />
                    <p>&copy; 2024 Faculdade UNIBETIM. Todos os direitos reservados.</p>
                    <p>Faça parte da nossa comunidade acadêmica e transforme seu futuro!</p>
                    
                    <ul className="footer-social-icons">
                        <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook"></i></a></li>
                        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter"></i></a></li>
                        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a></li>
                        <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin"></i></a></li>
                    </ul>

                    <p>Contatos: <br /> Telefone: (31) 1234-5678 <br /> Email: contato@unibETIM.edu.br</p>
                </div>
            </footer>
            <div className="content">
                {/* Roteamento para renderizar as views conforme o menu selecionado */}
                <Routes>
                    <Route path="/login.jsx" element={<ViewLogin />} />
                    <Route path="/bolsas" element={<ViewLogin />} />
                    <Route path="/eventos" element={<ViewLogin />} />
                    <Route path="/noticias" element={<ViewLogin />} />
                </Routes>
            </div>
        </div>

    );
}


