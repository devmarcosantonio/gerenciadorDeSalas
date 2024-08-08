import React from 'react';
import CardSala from '../components/componentsSalas/CardSala'
import ModalCadastroSala from '../components/componentsSalas/ModalCadastroSala'
import styles from './Salas.module.css'
import { GlobalContext } from '../GlobalContext';

const Salas = () => {
  const {sistemaDeAlocacao, salas} = React.useContext(GlobalContext)
  const [modalCadastroSalaAberto, setModalCadastroSalaAberto] = React.useState(false);

  function handleClickBtnCadastrarSala () {
    setModalCadastroSalaAberto(!modalCadastroSalaAberto)
  }

  return (
    <div>
      <div className={styles.header}>
        <h1>Gerenciamento de salas</h1>
        <div className={styles.headerButtons}>
          <button onClick={handleClickBtnCadastrarSala}>Cadastrar Sala +</button>
        </div>
      </div>
      {salas.length > 0 ? 
        <ul className={styles.listaDeSalas}>
        {salas.map((sala) => {
            return (
                <li key={sala._id}><CardSala sala={sala}/></li>
            )
        })}
        </ul>
        : <div className={styles.nenhuma}>nenhuma sala cadastrada</div>}
      
        <ModalCadastroSala modalCadastroSalaAberto={modalCadastroSalaAberto} setModalCadastroSalaAberto={setModalCadastroSalaAberto}/>
    </div>
  );
};

export default Salas;
