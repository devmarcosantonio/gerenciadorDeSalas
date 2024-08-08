import React from 'react';
import { GlobalContext } from '../../GlobalContext';
import { DELETE_PROFESSOR } from '../../api';
import styles from './CardProfessor.module.css'

const CardProfessor = ({professor, handleClickBntGerenciarProfessor, setProfessorGerencia, setModalGerenciarProfessorAberto}) => {

    const {professores, setProfessores, sistemaDeAlocacao} = React.useContext(GlobalContext)
    const {nome, sobrenome, disciplinas, cpf, _id, email} = professor

    function handleClickBntGerenciarProfessor ({target}) {
      setProfessorGerencia(professor)
      setModalGerenciarProfessorAberto(true)
    }

    async function handleClickRemoverProfessor ({target}) {
      const confirmacao = window.confirm('você tem certeza que deseja remover esse professor?');
      if(confirmacao) {
        try {
          const {url, options} = DELETE_PROFESSOR ({id: target.getAttribute('idd')})
          const response = await fetch(url, options);
    
          if (response.ok) {
            const responseJson = await response.json();
            setProfessores(professores.filter((prof) => prof._id !== responseJson.professor._id));
            sistemaDeAlocacao.atualizarListaProfessores(professores)
            alert('Professor removido com sucesso!');
          } else {
            alert('Erro ao remover professor.');
          }
        } catch (error) {
          console.error('Erro ao remover professor:', error);
          alert('Erro ao remover professor.');
        }
      } 
  };
  
  return (
    <div className={styles.card}>
        <div className={styles.cardInfo}>
            <h3>{nome} {sobrenome}</h3>
            <p>Email: {email}</p>
            <p>cpf: {cpf}</p>
        </div>
        <div className={styles.cardButtons}>
            <button idd={_id} onClick={handleClickBntGerenciarProfessor} className={styles.btnEditar} >Gerenciar Professor</button>
            <button idd={_id} className={styles.btnRemover} onClick={handleClickRemoverProfessor}>Remover</button>
        </div>
    </div>
  );
};

export default CardProfessor;