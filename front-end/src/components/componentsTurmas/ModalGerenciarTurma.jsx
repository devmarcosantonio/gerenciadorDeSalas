import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../GlobalContext';
import styles from './ModalGerenciarTurma.module.css';
import { PUT_DEFINIR_PROFESSOR_NA_TURMA } from '../../api';
import { Link, useLocation } from 'react-router-dom';

export default function ModalGerenciarTurma({ turma, setModalGerenciarTurmaAberto, modalGerenciarTurmaAberto }) {
  const { sistemaDeAlocacao } = useContext(GlobalContext);
  const [professoresAptosLivres, setProfessoresAptosLivres] = useState([]);
  const [professorSelecionado, setProfessorSelecionado] = useState('');
  const [disciplinaTurma, setDisciplinaTurma] = useState(null);

  useEffect(() => {
    if (turma && sistemaDeAlocacao) {
      setProfessorSelecionado(turma.idProfessor || '');
      setProfessoresAptosLivres(sistemaDeAlocacao.buscarProfessoresAptosLivres(turma))
    }
  }, [turma]);

  const handleSelectChange = (event) => {
    setProfessorSelecionado(event.target.value);
  };

  const handleClickAtualizar = async () => {
    const {url, options} = PUT_DEFINIR_PROFESSOR_NA_TURMA({idTurma: turma._id, idProfessor: professorSelecionado})

    if (turma.alocada) {
        try {
          const response = await fetch(url, options)
          if (response.ok) {
            const responseJson = await response.json()
            alert('Professor definido para turma');
          } else {
            alert('Erro ao definir professor pra turma')
          }
      } catch {
        alert('Erro ao definir professor pra turma')
      }

      setModalGerenciarTurmaAberto(false)
    } else {
      alert('A turma deve está alocada para alguma sala!')
    }
    

  };

  if (!modalGerenciarTurmaAberto || !turma) {
    return null;
  }

  return (
    <div className={styles.modalFundo}>
      <div className={styles.modal}>
        <h2>Gerenciar Turma</h2>
        <h3>Turma {turma.numero} - {turma  ? `${sistemaDeAlocacao.getDisciplinaPorId(turma.idDisciplina).nome}` : ''}</h3>
        <form className={styles.form}>
          <div>
          <label htmlFor="professorSelect">Definir um Professor para turma:</label>
          <select
            id="professorSelect"
            value={professorSelecionado}
            onChange={handleSelectChange}
            className={styles.select}
            disabled={turma.alocado}
          >
            <option value="">Selecione</option>
            {professoresAptosLivres.map((professor) => (
              <option key={professor.id} value={professor.id}>
                {professor.nome} {professor.sobrenome} - cpf: {professor.cpf}
              </option>
            ))}
          </select>

          </div>

          <div>
            <div className={styles.areaObs}>

            {!turma.idSala &&
              <div className={styles.obs}>
                  <span>obs: Turma precisa ser alocada em uma sala para poder definir professor.</span>
                  <Link to='/salas'><button>Ir para página de Salas</button></Link>
              </div>
              }

            {professoresAptosLivres && professoresAptosLivres.length === 0 &&
                          <div className={styles.obs}>
                              <span>obs: Nenhum professor disponível a dar essa disciplina.</span>
                              <Link to='/professores'><button>Ir para página de Professores</button></Link>
                          </div>
                          }
                    </div>

            </div>
          
            
        
          <div className={styles.areaButtons}>
            <button type="button" onClick={handleClickAtualizar}  className={styles.btnPositivo}>
              Atualizar
            </button>
            <button type="button" onClick={() => setModalGerenciarTurmaAberto(false)}  className={styles.btnNegativo}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
