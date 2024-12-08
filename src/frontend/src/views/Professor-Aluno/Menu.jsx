import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../styles/menuUsuarios.css';

export default function Menu() {
    return (
        <div>
            {/* Navbar principal */}
            <div className="l-navbar" id="nav-bar">
                <nav className="nav">
                    <div>
                        {/* Link para a página inicial do Secretário */}
                        <Link to="index" className="nav_logo">
                            <i className="bx bx-layer nav_logo-icon"></i>
                            <span className="nav_logo-name">Professor</span>
                        </Link>

                        {/* Navigation Links */}
                        <div className="nav_list">
                            <Link to="painel" className="nav_link">
                            <i class='bx bx-group nav_icon'></i>
                            <span className="nav_name">Painel de Controle</span>
                            </Link>
                            <Link to="atividade" className="nav_link">
                            <i class='bx bx-book nav_icon'></i>
                            <span className="nav_name">Atividades</span>
                            </Link>
                            <Link to="chamada" className="nav_link">
                            <i class='bx bx-edit nav_icon'></i>
                            <span className="nav_name">Controle de Presença</span>
                            </Link>
                            <Link to="relatorios" className="nav_link">
                            <i class='bx bx-bar-chart-alt nav_icon'></i>
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
