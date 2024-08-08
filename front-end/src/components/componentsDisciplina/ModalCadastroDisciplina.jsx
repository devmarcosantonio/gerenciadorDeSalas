import React from 'react';
import styles from './ModalCadastroDisciplina.module.css'
import { GlobalContext } from '../../GlobalContext';
import { POST_NOVA_DISCIPLINA } from '../../api';


const ModalCadastroDisciplina = ({ modalCadastroDisciplinaAberto, setModalCadastroDisciplinaAberto}) => {
  const [nome, setNome] = React.useState('');
  const [cargaHoraria, setCargaHoraria] = React.useState('30');
  const [tipo, setTipo] = React.useState('teorica');
  const [natureza, setNatureza] = React.useState('obrigatoria');

  const {disciplinas, setDisciplinas} = React.useContext(GlobalContext)
  
  

  const handleClickCadastrar = async () => {

    if (nome && cargaHoraria && tipo && natureza) {
      const novaDisciplina = {nome, cargaHoraria: Number(cargaHoraria), tipo, natureza}
      try {
        const {url, options} = POST_NOVA_DISCIPLINA (novaDisciplina);
        const response = await fetch(url, options);

        if (response.ok) {
          const jsonResponse = await response.json()
          setDisciplinas([...disciplinas, jsonResponse.disciplina])
          alert('Disciplina cadastrada com sucesso!');
        } else {
          alert('Erro ao cadastrar a disciplina.');
        }
      } catch (error) {
        console.error('Erro ao cadastrar a disciplina:', error);
        alert('Erro ao cadastrar a disciplina.');
      }

      setModalCadastroDisciplinaAberto(false)
    } else {
      alert('Preencha todos os campos!');
    }
  };

  if (!modalCadastroDisciplinaAberto) {
    return null;
  }

  return (
    <div className={styles.modalFundo}>
      <div className={styles.modal}>
        <h2>Cadastro de Disciplina</h2>
        <form className={styles.form}>
          <label>
            Nome
            <input
              type="text"
              placeholder='Matemática discreta'
              className={styles.inputText}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>

          <label>
            Carga Horária
            <div className={styles.areaRadios}>
              <label>
                <input
                  style={{marginTop: '10px'}}
                  type="radio"
                  value="30"
                  checked={cargaHoraria === "30"}
                  onChange={(e) => setCargaHoraria(e.target.value)}
                />
                30
              </label>

              <label>
                  <input
                      style={{marginTop: '10px'}}
                      type="radio"
                      value="60"
                      checked={cargaHoraria === "60"}
                      onChange={(e) => setCargaHoraria(e.target.value)}
                    />
                    60
              </label>

              <label>
                  <input
                      style={{marginTop: '10px'}}
                      type="radio"
                      value="90"
                      checked={cargaHoraria === "90"}
                      onChange={(e) => setCargaHoraria(e.target.value)}
                    />
                    90
              </label>
            </div>
          </label>


          <label>
            Natureza
            <div className={styles.areaRadios}>
              <label>
                <input
                  style={{marginTop: '10px'}}
                  type="radio"
                  value="obrigatoria"
                  checked={natureza === "obrigatoria"}
                  onChange={(e) => setNatureza(e.target.value)}
                />
                Obrigatória
              </label>

              <label>
                  <input
                      style={{marginTop: '10px'}}
                      type="radio"
                      value="optativa"
                      checked={natureza === "optativa"}
                      onChange={(e) => setNatureza(e.target.value)}
                    />
                    Optativa
              </label>
            </div>
          </label>

          <label>
            Tipo
            <div className={styles.areaRadiosTipos}>
              
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

          <div className={styles.areaButtons }>
            <button type="button" onClick={handleClickCadastrar} className={styles.btnPositivo}>
              Cadastrar
            </button>
            <button type="button" onClick={() => setModalCadastroDisciplinaAberto(false)}  className={styles.btnNegativo}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCadastroDisciplina;
