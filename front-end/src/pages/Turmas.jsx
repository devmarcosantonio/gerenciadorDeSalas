import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../GlobalContext';
import CardTurma from '../components/componentsTurmas/CardTurma';
import styles from './Turmas.module.css';
import ModalCadastroTurma from '../components/componentsTurmas/ModalCadastroTurma';
import ModalGerenciarTurma from '../components/componentsTurmas/ModalGerenciarTurma';

const Turmas = () => {
  const { turmas, disciplinas, idDisciplina, setIdDisciplina } = useContext(GlobalContext);
  const [turmasDisciplina, setTurmasDisciplina] = useState([]);
  const [disciplinaEscolhida, setDisciplinaEscolhida] = useState('');
  const [modalCadastroTurmaAberto, setModalCadastroTurmaAberto] = useState(false);
  const [turmaGerencia, setTurmaGerencia] = useState(null);
  const [modalGerenciarTurmaAberto, setModalGerenciarTurmaAberto] = useState(false)

  useEffect(() => {
    if (!idDisciplina) {
      setTurmasDisciplina(turmas);
      setDisciplinaEscolhida('TODAS');
    } else {
      const filteredTurmas = turmas.filter(t => t.idDisciplina === idDisciplina);
      setTurmasDisciplina(filteredTurmas);

      const disciplina = disciplinas.find(d => d._id === idDisciplina);
      if (disciplina) {
        setDisciplinaEscolhida(disciplina.nome);
      }
    }
  }, [idDisciplina, turmas, disciplinas]);

  const handleClickBtnCadastrar = () => {
    setModalCadastroTurmaAberto(true);
  };


  const handleDisciplinaChange = ({ target }) => {
    const selectedDisciplinaId = target.value;
    setIdDisciplina(selectedDisciplinaId || null); // Se for '', define como null
  };

  return (
    <div>
      <div className={styles.header}>
        <h1>Gerenciamento de Turmas</h1>
        <div className={styles.headerButtons}>
          <button onClick={handleClickBtnCadastrar}>Cadastrar Turma +</button>
          <div className={styles.headerSelect}>
            <label>Filtrar por Disciplina:
              <select value={idDisciplina || ''} onChange={handleDisciplinaChange} className={styles.selectDisciplina}>
                <option value="">TODAS</option>
                {disciplinas.map((disciplina) => (
                  <option key={disciplina._id} value={disciplina._id}>
                    {disciplina.nome}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <h2><span className={styles.detalheSpan}>Disciplina:</span> {disciplinaEscolhida}</h2>
      </div>
      <div className={styles.container}>
        <ul className={styles.listaDeTurmas}>
          {turmasDisciplina.map(turma => (
            <li key={turma._id}>
              <CardTurma 
                turma={turma} 
                setTurmasDisciplina={setTurmasDisciplina}
                setTurmaGerencia={setTurmaGerencia}
                setModalGerenciarTurmaAberto={setModalGerenciarTurmaAberto} />
            </li>
          ))}
        </ul>
      </div>
      <ModalCadastroTurma
        modalCadastroTurmaAberto={modalCadastroTurmaAberto}
        setModalCadastroTurmaAberto={setModalCadastroTurmaAberto}
        idDisciplina={idDisciplina}
        setTurmasDisciplina={setTurmasDisciplina}
      />

      <ModalGerenciarTurma 
        turma={turmaGerencia}
        modalGerenciarTurmaAberto={modalGerenciarTurmaAberto}
        setModalGerenciarTurmaAberto={setModalGerenciarTurmaAberto}
      />
      
    </div>
  );
};

export default Turmas;
