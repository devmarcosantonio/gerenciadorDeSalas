import React, { useEffect } from 'react';
import { GlobalContext } from '../../GlobalContext';
import styles from './ModalAlocarTurma.module.css';
import { POST_NOVO_HORARIO, PUT_DESALOCAR_TURMA } from '../../api';

const ModalDesalocarTurma = ({ modalDesalocarTurmaAberto, setModalDesalocarTurmaAberto, idSala }) => {
  const {sistemaDeAlocacao, setHorarios, horarios} = React.useContext(GlobalContext);
  const [turmasAlocadas, setTurmasAlocadas] = React.useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = React.useState('');

  useEffect(() => {
    if (sistemaDeAlocacao) {
      let turmasFiltradas = sistemaDeAlocacao.getTurmasAlocadasDaSala(idSala);
      if (turmasFiltradas ) {
        turmasFiltradas = turmasFiltradas.map((t) => {
            return {...t, disciplina: sistemaDeAlocacao.getDisciplinaPorId(t.idDisciplina)}
        })

        setTurmasAlocadas(turmasFiltradas)
      }
    }
  }, [sistemaDeAlocacao]);

  const handleChangeTurma = (event) => {
    const turmaId = event.target.value;
    setTurmaSelecionada(turmaId);
  };


  async function handleClickBtnDesalocarTurma () {

    
    if (turmaSelecionada) {
        const body = {'id': turmaSelecionada}
        const {url, options} = PUT_DESALOCAR_TURMA(body)
        try {
            const response = await fetch(url, options)
            if (response.ok) {
                const responseJson = await response.json()
                alert('Turma desalocada com sucesso!')
            } else {
                alert('Erro ao desalocar turma!')
            }

        } catch {
            alert('Erro ao desalocar turma!')
        }

        setModalDesalocarTurmaAberto(false)
    }

      
  }

  if (!modalDesalocarTurmaAberto) return null;

  return (
    <div className={styles.modalFundo}>
      <div className={styles.modal}>
        <h1>Desalocar uma turma</h1>
        <div className={styles.form}>
          <h2>Turmas alocadas</h2>
          <select value={turmaSelecionada} onChange={handleChangeTurma} >
            <option value="">Selecione uma turma</option>
            {turmasAlocadas.map((turma, index) => (
              <option key={index} value={turma.id}>
                Turma: {turma.numero}, {turma.turno}, {turma.disciplina.nome} ({turma.disciplina.cargaHoraria}h)
              </option>
            ))}
          </select>
        </div>

        <div className={styles.areaButtons}>
          <button type="button" onClick={handleClickBtnDesalocarTurma} className={styles.btnPositivo}>Desalocar Turma</button>
          <button type="button" onClick={() => setModalDesalocarTurmaAberto(false)} className={styles.btnNegativo}>Cancelar</button>
        </div>
      </div>

      
    </div>
  );
};

export default ModalDesalocarTurma
