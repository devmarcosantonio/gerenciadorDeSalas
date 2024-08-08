import React from 'react';
import styles from './ModalCadastroSala.module.css'
import { GlobalContext } from '../../GlobalContext';
import { POST_NOVA_SALA } from '../../api';

const ModalCadastroSala = ({ modalCadastroSalaAberto, setModalCadastroSalaAberto}) => {
  const [nome, setNome] = React.useState('');
  const [capacidade, setCapacidade] = React.useState('');
  const [tipo, setTipo] = React.useState('teorica');
  const {salas, setSalas} = React.useContext(GlobalContext)

  const handleClickCadastrar = async() => {

    if (nome && capacidade && tipo) {
      const novaSala = {nome, capacidade: Number(capacidade), tipo}
      try {
        const {url, options} = POST_NOVA_SALA(novaSala);
        const response = await fetch(url, options);

        if (response.ok) {
          const jsonResponse = await response.json()
          setSalas([...salas, jsonResponse.sala])
          alert('Sala cadastrada com sucesso!');
        } else {
          alert('Erro ao cadastrar sala.');
        }
      } catch (error) {
        console.error('Erro ao cadastrar sala:', error);
        alert('Erro ao cadastrar sala.');
      }

      setModalCadastroSalaAberto(false)
    } else {
      alert('Preencha todos os campos!');
    }
  };

  if (!modalCadastroSalaAberto) {
    return null;
  }

  return (
    <div className={styles.modalFundo}>
      <div className={styles.modal}>
        <h2>Cadastro de Sala</h2>
        <form className={styles.form}>
          <label>
            Nome
            <input
              type="text"
              placeholder='101N'
              className={styles.inputText}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>
          <label>
            Capacidade
            <input
              type="number"
              placeholder='60'
              className={styles.inputText}
              value={capacidade}
              onChange={(e) => setCapacidade(e.target.value)}
            />
          </label>
          <label>
            Tipo
            <div className={styles.formTipos}>
              
              <label>
                <input
                  style={{marginTop: '10px'}}
                  type="radio"
                  value="teorica"
                  checked={tipo === 'teorica'}
                  
                  onChange={(e) => setTipo(e.target.value)}
                />
                Teórica
              </label>
              <label>
                <input
                  type="radio"
                  value="informatica"
                  checked={tipo === 'informatica'}
                  onChange={(e) => setTipo(e.target.value)}
                />
                Informática
              </label>
              <label>
                <input
                  type="radio"
                  value="experimental"
                  checked={tipo === 'experimental'}
                  onChange={(e) => setTipo(e.target.value)}
                />
                Experimental
              </label>
            </div>
          </label>
          <div className={styles.areaButtons}>
            <button type="button" onClick={handleClickCadastrar}  className={styles.btnPositivo}>
              Cadastrar
            </button>
            <button type="button" onClick={() => setModalCadastroSalaAberto(false) }  className={styles.btnNegativo}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCadastroSala;
