import './styles/App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Routes, Route,   Navigate } from 'react-router-dom';

import ViewIndex from './views';
import ViewLogin from './views/login';
import MenuSecretario from './views/secretario/menu';
import ViewInicial from './views/secretario';
import ViewCadastroUser from './views/secretario/CadastroUsuario';
import ViewCadastroCurso from './views/secretario/CadastroCurso';
import ViewRelatorio from './views/secretario/Relatorio';  
import Menu from './views/Professor-Aluno/Menu';
import Index from './views/Professor-Aluno';
import Controle from './views/Professor-Aluno/Painel';
import Atividade from './views/Professor-Aluno/Atividades';
import Avaliacao from './views/Professor-Aluno/Avaliacao';
import Chamada from './views/Professor-Aluno/Chamada';
import Relatorio from './views/Professor-Aluno/Relatorio';
import Disciplina from './views/Professor-Aluno/Disciplina';


export default function App() {
  return (
    <div className="App">
    <Routes>
      {/* Rotas principais */}
      <Route path="/" element={<ViewIndex />} />
      <Route path="/login" element={<ViewLogin />} />

      {/* Rotas do Professor */}
      <Route path="/usuario" element={<Menu />}>
        <Route index element={<Navigate to="index" replace />} />
        <Route path="index" element={<Index />} />
        <Route path="painel" element={<Controle />} />

        <Route path="disciplina" element={<Disciplina />} />
        <Route path="atividade" element={<Atividade />} />
        
        <Route path="avaliacao" element={<Avaliacao />} />
        <Route path="chamada" element={<Chamada />} />
        <Route path="relatorios" element={<Relatorio />} />
        <Route path="logout" element={<ViewInicial />} />
      </Route>

      {/* Rotas do Secretario */}
      <Route path="/secretario" element={<MenuSecretario />}>
        <Route index element={<Navigate to="index" replace />} />
        <Route path="index" element={<ViewInicial />} />
        <Route path="gestao-cursos" element={<ViewCadastroCurso />} />
        <Route path="relatorios" element={<ViewRelatorio />} />
        <Route path="gestao-usuario" element={<ViewCadastroUser />} />
        <Route path="logout" element={<ViewInicial />} />
      </Route>
    </Routes>
    </div>
  );
}