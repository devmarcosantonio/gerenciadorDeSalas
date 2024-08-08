import React, { useEffect } from 'react';
import { GlobalContext } from '../GlobalContext';
import CardDisciplina from '../components/componentsDisciplina/CardDisciplina';
import ModalCadastroDisciplina from '../components/componentsDisciplina/ModalCadastroDisciplina';
import styles from './Disciplinas.module.css'

const Disciplinas = () => {

  const {disciplinas} = React.useContext(GlobalContext)
  const [modalCadastroDisciplinaAberto, setModalCadastroDisciplinaAberto] = React.useState(false)

  const [filtroTexto, setFiltroTexto] = React.useState('')

  const[disciplinasLista, setDisciplinasLista] = React.useState([])

  function handleClickBtnCadastrarDisciplina () { 
    setModalCadastroDisciplinaAberto(true)
  }

  useEffect (() => {
    setDisciplinasLista([...disciplinas])
  }, [disciplinas])

  const removerAcentos = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  useEffect(() => {
    if (filtroTexto) {
      setDisciplinasLista(disciplinas.filter((disciplina) => 
        removerAcentos(disciplina.nome.toLowerCase()).includes(removerAcentos(filtroTexto.toLowerCase()))
      ));
    } else {
      setDisciplinasLista([...disciplinas]);
    }
  }, [filtroTexto, disciplinas]);



  return (
    <div>
      <div className={styles.header}>
        <h1>Gerenciamento de disciplinas</h1>
        <div className={styles.headerButtons}>
          <button onClick={handleClickBtnCadastrarDisciplina }>Cadastrar Disciplina +</button>
        </div>
        <div>
          <label className={styles.filtroPorNome}>Filtro
            <input type="text" value={filtroTexto} onChange={(e) => setFiltroTexto(e.target.value)} />
          </label>
        </div>
      </div>
      {disciplinas.length > 0 ? 
        <ul className={styles.listaDeDisciplinas}>
        {disciplinasLista.map((disciplina) => {
            return (
                <li key={disciplina._id}><CardDisciplina disciplina={disciplina}/></li>
            )
        })}
        </ul>
        : <div className={styles.nenhuma}>nenhuma disciplina cadastrada...</div>}
      
        <ModalCadastroDisciplina modalCadastroDisciplinaAberto={modalCadastroDisciplinaAberto} setModalCadastroDisciplinaAberto={setModalCadastroDisciplinaAberto}/>
    </div>
  );
};

export default Disciplinas;
