import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Salas from './pages/Salas';
import Disciplinas from './pages/Disciplinas';
import Professores from './pages/Professores';
import Turmas from './pages/Turmas';
import Horarios from './pages/Horarios';
import Login from './pages/Login';
import { GlobalStorage } from './GlobalContext';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {/* Renderiza a Navbar somente se o caminho não for '/' */}
      {location.pathname !== '/' && <Navbar />}
      
      {/* Configuração das rotas da aplicação */}
      <Routes>
        <Route path="/" element={<Login />} /> {/* Rota para a página de login */}
        <Route path="salas" element={<Salas />} /> {/* Rota para a página de salas */}
        <Route path="disciplinas" element={<Disciplinas />} /> {/* Rota para a página de disciplinas */}
        <Route path="professores" element={<Professores />} /> {/* Rota para a página de professores */}
        <Route path="turmas" element={<Turmas />} /> {/* Rota para a página de turmas */}
        <Route path="horarios" element={<Horarios />} /> {/* Rota para a página de horários */}
      </Routes>
    </div>
  );
}

// Componente AppWrapper para envolver o aplicativo com BrowserRouter e GlobalStorage
export default function AppWrapper() {
  return (
    <BrowserRouter>
      <GlobalStorage>
        <App /> {/* Renderiza o componente principal App */}
      </GlobalStorage>
    </BrowserRouter>
  );
}
