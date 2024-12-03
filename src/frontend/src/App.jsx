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
import MenuProfessor from './views/Professor/Menu';
import IndexProf from './views/Professor';
import ControleProf from './views/Professor/Painel';
import AtividadeProf from './views/Professor/Atividades';
import ChamadaProf from './views/Professor/Chamada';
import RelatorioProf from './views/Professor/Relatorio';
import MenuAluno from './views/Aluno/Menu';
import IndexAluno from './views/Aluno';
import ControleAluno from './views/Aluno/Painel';
import AtividadeAluno from './views/Aluno/Atividades';
import RelatorioAluno from './views/Aluno/Relatorio';
import AulaProf from './views/Professor/Aula';
import DisciplinaProf from './views/Professor/Disciplina';


export default function App() {
  return (
    <div className="App">
    <Routes>
      {/* Rotas principais */}
      <Route path="/" element={<ViewIndex />} />
      <Route path="/login" element={<ViewLogin />} />

      {/* Rotas do Aluno */}
        <Route path="/aluno" element={<MenuAluno />}>
        <Route index element={<Navigate to="index" replace />} />
        <Route path="index" element={<IndexAluno />} />
        <Route path="painel" element={<ControleAluno />} />
        <Route path="atividade" element={<AtividadeAluno />} />
        <Route path="relatorios" element={<RelatorioAluno />} />
        <Route path="logout" element={<ViewInicial />} />
      </Route>

      {/* Rotas do Professor */}
      <Route path="/professor" element={<MenuProfessor />}>
        <Route index element={<Navigate to="index" replace />} />
        <Route path="index" element={<IndexProf />} />
        <Route path="painel" element={<ControleProf />} />

        <Route path="disciplina" element={<DisciplinaProf />} />
        <Route path="aula" element={<AulaProf />} />

        <Route path="atividade" element={<AtividadeProf />} />
        <Route path="chamada" element={<ChamadaProf />} />
        <Route path="relatorios" element={<RelatorioProf />} />
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