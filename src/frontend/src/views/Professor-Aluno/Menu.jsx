import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../styles/menuUsuarios.css';

export default function Menu() {
    const [nomeUsuario, setNomeUsuario] = useState('');

    // Quando o componente for montado, pega o nome do usuário do localStorage
    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (usuario) {
            setNomeUsuario(usuario.tipo);  // Armazena o tipo do usuário no estado
        }
    }, []);  // O useEffect será chamado apenas uma vez, quando o componente for montado

    return (
        <div>
            {/* Navbar principal */}
            <div className="l-navbar" id="nav-bar">
                <nav className="nav">
                    <div>
                        {/* Link para a página inicial */}
                        <Link to="index" className="nav_logo">
                            <i className="bx bx-layer nav_logo-icon"></i>
                            <span className="nav_logo-name">{nomeUsuario === 'Aluno' ? 'Aluno' : 'Professor'}</span>
                        </Link>

                        {/* Navigation Links */}
                        <div className="nav_list">
                            <Link to="painel" className="nav_link">
                                <i className='bx bx-group nav_icon'></i>
                                <span className="nav_name">Painel de Controle</span>
                            </Link>
                            <Link to="atividade" className="nav_link">
                                <i className='bx bx-book nav_icon'></i>
                                <span className="nav_name">Atividades</span>
                            </Link>

                            {/* Renderizar o link de Controle de Presença somente se o usuário for Professor */}
                            {nomeUsuario === 'Professor' && (
                                <Link to="chamada" className="nav_link">
                                    <i className='bx bx-edit nav_icon'></i>
                                    <span className="nav_name">Controle de Presença</span>
                                </Link>
                            )}

                            <Link to="relatorios" className="nav_link">
                                <i className='bx bx-bar-chart-alt nav_icon'></i>
                                <span className="nav_name">Relatórios</span>
                            </Link>
                        </div>

                    </div>

                    {/* Link para logout */}
                    <Link to="/" className="nav_link">
                        <i className="bx bx-log-out nav_icon"></i>
                        <span className="nav_name">Sair</span>
                    </Link>
                </nav>
            </div>

            {/* Conteúdo renderizado dinamicamente pelas rotas filhas */}
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}
