import React from 'react';
import styles from './CardSala.module.css'
import imagePessoas from '/imges/pessoas.png'
import { GlobalContext } from '../../GlobalContext';
import { DELETE_SALA } from '../../api';
import { Link } from 'react-router-dom';

const CardSala = ({sala}) => {
    const {_id, nome, capacidade, tipo} = sala

    const {salas, setSalas, setIdSala, idSala, sistemaDeAlocacao} = React.useContext(GlobalContext)


    function handleClickGerenciarHorarios () {
      localStorage.setItem('idSalaStorage', _id)
      setIdSala(_id);
    }
  

    async function handleClickRemoverSala () {
      const confirmacao = window.confirm('você tem certeza que deseja remover essa sala?');
      if(confirmacao) {
        try {
          const {url, options} = DELETE_SALA ({id: _id})
          const response = await fetch(url, options);
    
          if (response.ok) {
            const responseJson = await response.json();
            setSalas(salas.filter((sala) => sala._id !== responseJson.sala._id));
            alert('Sala excluída com sucesso!');
          } else {
            alert('Erro ao excluir sala.');
          }
        } catch (error) {
          console.error('Erro ao excluir sala:', error);
          alert('Erro ao excluir sala.');
        }
      } 
  };
  
  return (
    <div className={styles.card}>
      <div className={styles.cardInfo}>
        <h3>Sala {nome}</h3>
        <div className={styles.capacidade}>
          <img className={styles.capacidadeIcone} src={imagePessoas} alt="capacidade" />
          {capacidade}
        </div>
        <p>{tipo}</p>
      </div>
        
        <div className={styles.cardButtons}>
          <Link to='/horarios' onClick={handleClickGerenciarHorarios}>
            <button className={styles.btnVisualizarHorarios}>Visualizar Horários</button>
          </Link>
          <button idd={_id} className={styles.btnRemover} onClick={handleClickRemoverSala}>Remover</button>
        </div>
    </div>
  );
};

export default CardSala;