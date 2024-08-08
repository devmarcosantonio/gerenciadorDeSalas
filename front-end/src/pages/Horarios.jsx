import React, { useEffect, useState, useContext } from 'react';
import styles from './Horarios.module.css';
import { GlobalContext } from '../GlobalContext';
import ModalAlocarTurma from '../components/componentsHorario/ModalAlocarTurma';
import ModalDesalocarTurma from '../components/componentsHorario/ModalDesalocarTurma';

const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const periods = {
  manha: ['07:30 - 08:20', '08:20 - 09:10', '09:10 - 10:10', '10:10 - 11:00', '11:00 - 12:00', '12:00 - 12:50'],
  tarde: ['13:10 - 14:00', '14:00 - 14:50', '14:50 - 15:40', '15:50 - 16:40', '16:40 - 17:30', '17:40 - 18:30'],
  noite: ['18:30 - 19:20', '19:30 - 20:20', '20:20 - 21:10', '21:10 - 22:00']
};

export default function Horarios() {
  const { sistemaDeAlocacao, idSala } = useContext(GlobalContext);
  const [idSalaStorage, setIdSalaStorage] = useState(null);
  const [sala, setSala] = useState(null);
  const [horarios, setHorarios] = useState([]);
  const [modalAlocarTurmaAberto, setModalAlocarTurmaAberto] = useState(false);
  const [modalDesalocarTurmaAberto, setModalDesalocarTurmaAberto] = useState(false);

  useEffect(() => {
    const idSalaStorage_ = localStorage.getItem('idSalaStorage')
    if (idSalaStorage_) setIdSalaStorage(idSalaStorage_)

    if (sistemaDeAlocacao && idSalaStorage) {
      const dadosSala = sistemaDeAlocacao.getSalaPorId(idSalaStorage);
      console.log(dadosSala)
      setSala(dadosSala);
      const dadosHorarios = sistemaDeAlocacao.getHorariosDeSalaPorIdSala(idSala);
      setHorarios(dadosHorarios);
    } 
  }, [idSalaStorage]);

  const gridDia = [2, 3, 4, 5, 6, 7];

  const gridPeriodo = {
    periodosManha: [1, 2, 3, 4, 5, 6],
    periodosTarde: [1, 2, 3, 4, 5, 6],
    periodosNoite: [1, 2, 3, 4]
  }

  function handleClickBtnAlocarTurma() {
    setModalAlocarTurmaAberto(true);
  }

  function handleClickBtnDesalocarTurma() {
    setModalDesalocarTurmaAberto(true)
  }

  const renderizarHorario = (idSala, dia, turno, periodo) => {
    if (sistemaDeAlocacao) {
      const horario = sistemaDeAlocacao.getHorarioPorDiaTurnoPeriodo(idSala, dia, turno, periodo)
      if (horario) {
      const turma = sistemaDeAlocacao.getTurmaPorId(horario.idTurma)
      if(turma) {
        const disciplina = sistemaDeAlocacao.getDisciplinaPorId(turma.idDisciplina)
        if(turma && disciplina) {
        return (
        <div className={styles.turmaTabela}>
        <span>Turma {turma.numero}</span>
        <p>{disciplina.nome}</p>
        </div>
      )
      }
      
    }
    } else {
    return ''
    }
    }
  }

  return (
    <div>
      <div className={styles.header}>
        <h1>Gerenciamento de Horários</h1>
        <h2>Sala: {sala ? sala.nome : ''}</h2>
        <div className={styles.headerButtons}>
          <button onClick={handleClickBtnAlocarTurma} className={styles.btnAlocar}>Alocar Turma</button>
          <button onClick={handleClickBtnDesalocarTurma} className={styles.btnDesalocar}>Desalocar Turma</button>
        </div>
      </div>

      
      <div className={styles.horarios}>
          <h3 className={styles.header}>Manhã</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.headerCell}>Período</th>
                {gridDia.map((dia, index) => (
                  <th key={index} className={styles.headerCell}>{daysOfWeek[dia-1]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gridPeriodo.periodosManha.map((periodo, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.dataCell}>{periods.manha[index]}</td>
                  {gridDia.map((dia, index) => (
                    <td key={index} className={styles.dataCell}>{renderizarHorario(idSala, dia, 'M', periodo)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className={styles.header}>Tarde</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.headerCell}>Período</th>
                {gridDia.map((dia, index) => (
                  <th key={index} className={styles.headerCell}>{daysOfWeek[dia-1]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gridPeriodo.periodosTarde.map((periodo, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.dataCell}>{periods.tarde[index]}</td>
                  {gridDia.map((dia, index) => (
                    <td key={index} className={styles.dataCell}>{renderizarHorario(idSala, dia, 'T', periodo)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        <h3 className={styles.header}>Noite</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.headerCell}>Período</th>
              {gridDia.map((dia, index) => (
                <th key={index} className={styles.headerCell}>{daysOfWeek[dia-1]}</th>
              ))}
            </tr>
            </thead>
            <tbody>
              {gridPeriodo.periodosNoite.map((periodo, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.dataCell}>{periods.noite[index]}</td>
                  {gridDia.map((dia, index) => (
                    <td key={index} className={styles.dataCell}>{renderizarHorario(idSala, dia, 'N', periodo)}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {modalAlocarTurmaAberto && (
        <ModalAlocarTurma 
          modalAlocarTurmaAberto={modalAlocarTurmaAberto} 
          setModalAlocarTurmaAberto={setModalAlocarTurmaAberto}
        />
      )}

      {modalDesalocarTurmaAberto && (
        <ModalDesalocarTurma 
        modalDesalocarTurmaAberto={modalDesalocarTurmaAberto} 
        setModalDesalocarTurmaAberto={setModalDesalocarTurmaAberto}
        idSala={idSala}
      />
      )}
    </div>
  );
}
