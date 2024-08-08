import React from 'react';
import { GlobalContext } from '../../GlobalContext';
import { DELETE_DISCIPLINA } from '../../api';
import styles from './CardDisciplina.module.css'
import { Link } from 'react-router-dom';

const CardDisciplina = ({disciplina}) => {

    const {disciplinas, setDisciplinas, turmas, setIdDisciplina, sistemaDeAlocacao} = React.useContext(GlobalContext)
    const {nome, cargaHoraria, _id, natureza, tipo} = disciplina
    const qtTurmas = turmas.filter(turma => turma.idDisciplina === _id).length


    function handleClickVisualizarTurmas () {
        localStorage.setItem('idDisciplinaFiltro', _id)
        setIdDisciplina(_id);
    }

    async function handleClickRemoverDisciplina ({target}) {
      const confirmacao = window.confirm('você tem certeza que deseja remover essa disciplina?');
      if(confirmacao) {
        try {
          const {url, options} = DELETE_DISCIPLINA ({id: target.getAttribute('idd')})
          const response = await fetch(url, options);
    
          if (response.ok) {
            const responseJson = await response.json();
            setDisciplinas(disciplinas.filter((d) => d._id !== responseJson.disciplina._id));
            sistemaDeAlocacao.atualizarListaDisciplina(disciplinas)
            alert('Disciplina removida com sucesso!');
          } else {
            alert('Erro ao remover a disciplina.');
          }
        } catch (error) {
          console.error('Erro ao remover a disciplina:', error);
          alert('Erro ao remover disciplina.');
        }
      } 
  };
  
  return (
    <div className={styles.card}>
        <div className={styles.cardInfo}>
            <h3>{nome}</h3>
            <p>Carga Horária: {cargaHoraria}h</p>
            <p>Tipo: {tipo}</p>
            <p>Natureza: {natureza}</p>
        </div>
        <div className={styles.cardButtons}>
            <Link to={`/turmas`} onClick={handleClickVisualizarTurmas}>
              <button className={styles.btnGerenciarTurmas}>Visualizar Turmas {qtTurmas}</button>
            </Link>
            <button idd={_id} className={styles.btnRemover} onClick={handleClickRemoverDisciplina}>Remover</button>
        </div>
    
    </div>
  );
};

export default CardDisciplina;