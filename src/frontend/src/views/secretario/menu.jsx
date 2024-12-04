import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../styles/menuUsuarios.css';

export default function MenuSecretario() {
  return (
    <div>
      {/* Navbar principal */}
      <div className="l-navbar" id="nav-bar">
        <nav className="nav">
          <div>
            {/* Link para a página inicial do Secretário */}
            <Link to="index" className="nav_link">
              <i className="bx bx-layer nav_logo-icon"></i>
              <span className="nav_logo-name">Secretário</span>
            </Link>

            {/* Lista de navegação */}
            <div className="nav_list">
            <Link to="gestao-cursos" className="nav_link">
              <i class="fa-solid fa-book-open"></i>                <span className="nav_name">Gestão de Cursos</span>
              </Link>
              
              <Link to="gestao-usuario" className="nav_link">
                <i class="fa-solid fa-user-group"></i>                <span className="nav_name">Gestão de Usuários</span>
              </Link>

              <Link to="relatorios" className="nav_link">
              <i class="fa-solid fa-shapes"></i>
                <span className="nav_name">Relatórios</span>
              </Link>
            </div>
          </div>

          {/* Link para logout */}
          <Link to="/" className="nav_link">
          <i class="fa-solid fa-arrow-left"></i>
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
