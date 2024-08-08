import React from 'react';
import SistemaDeAlocacao from './classes/SistemaDeAlocacao';

// Criação do contexto global
export const GlobalContext = React.createContext();

// Componente de armazenamento global
export const GlobalStorage = ({ children }) => {
  // Definição dos estados locais
  const [salas, setSalas] = React.useState([]);
  const [horarios, setHorarios] = React.useState([]);
  const [disciplinas, setDisciplinas] = React.useState([]);
  const [turmas, setTurmas] = React.useState([]);
  const [professores, setProfessores] = React.useState([]);
  const [idSala, setIdSala] = React.useState('');
  const [idDisciplina, setIdDisciplina] = React.useState('');
  const [sistemaDeAlocacao, setSistemaDeAlocacao] = React.useState(null);

  // Função para buscar os dados do servidor
  const fetchData = async () => {
    try {
      // Requisições assíncronas para buscar os dados das APIs
      const [salasResponse, disciplinasResponse, horariosResponse, turmasResponse, professoresResponse] = await Promise.all([
        fetch('http://localhost:5000/api/salas'),
        fetch('http://localhost:5000/api/disciplinas'),
        fetch('http://localhost:5000/api/horarios'),
        fetch('http://localhost:5000/api/turmas'),
        fetch('http://localhost:5000/api/professores')
      ]);

      // Conversão das respostas para JSON
      const salasJson = await salasResponse.json();
      const disciplinasJson = await disciplinasResponse.json();
      const horariosJson = await horariosResponse.json();
      const turmasJson = await turmasResponse.json();
      const professoresJson = await professoresResponse.json();

      // Atualização dos estados locais com os dados obtidos
      setSalas(salasJson.salas.sort((a, b) => a.nome.localeCompare(b.nome)));
      setDisciplinas(disciplinasJson.disciplinas.sort((a, b) => a.nome.localeCompare(b.nome)));
      setHorarios(horariosJson.horarios);
      setTurmas(turmasJson.turmas.sort((a, b) => a.numero - b.numero));
      setProfessores(professoresJson.professores.sort((a, b) => a.nome.localeCompare(b.nome)));
    } catch (error) {
      console.error('Erro ao buscar dados do servidor:', error);
      // Aqui seria interessante implementar um feedback para o usuário sobre o erro.
    }
  };

  // Efeito para buscar os dados ao montar o componente ou quando os estados dependentes mudam
  React.useEffect(() => {
    fetchData(); // Chama a função de busca de dados ao montar o componente e sempre que houver mudanças nos estados listados no array de dependências.
  }, [salas, horarios, professores, disciplinas, turmas]);

  // Efeito para criar a instância do SistemaDeAlocacao quando os dados estiverem disponíveis
  React.useEffect(() => {
    if (salas.length > 0 && horarios.length > 0 && professores.length > 0 && disciplinas.length > 0 && turmas.length > 0) {
      // Criação da instância do SistemaDeAlocacao com os dados obtidos
      setSistemaDeAlocacao(new SistemaDeAlocacao(salas, horarios, professores, disciplinas, turmas));
    }
  }, [salas, horarios, professores, disciplinas, turmas]);

  // Efeito para carregar os IDs de sala e disciplina do armazenamento local ao montar o componente
  React.useEffect(() => {
    const idSalaStorage = localStorage.getItem('idSalaStorage');
    const idDisciplinaFiltro = localStorage.getItem('idDisciplinaFiltro');
    setIdDisciplina(idDisciplinaFiltro);
    setIdSala(idSalaStorage);
  }, []);

  // Renderização do contexto global, fornecendo os estados e funções de atualização
  return (
    <GlobalContext.Provider value={{ 
      sistemaDeAlocacao, 
      salas, setSalas, 
      disciplinas, setDisciplinas, 
      turmas, setTurmas, 
      professores, setProfessores, 
      horarios, setHorarios, 
      idSala, setIdSala, 
      idDisciplina, setIdDisciplina 
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
