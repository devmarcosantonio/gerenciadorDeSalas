import React from 'react';
import { GlobalContext } from '../GlobalContext';
import CardProfessor from '../components/componentsProfessores/CardProfessor'
import ModalCadastroProfessor from '../components/componentsProfessores/ModalCadastroProfessor'
import ModalGerenciarProfessor from '../components/componentsProfessores/ModalGerenciarProfessor';

import styles from './Professores.module.css'

const Professores = () => {
  const [modalCadastroProfessorAberto, setModalCadastroProfessorAberto] = React.useState(false)

  
  const [modalGerenciarProfessorAberto, setModalGerenciarProfessorAberto] = React.useState(false)

  const [professoresLista, setProfessoresLista] = React.useState([])
  const [filtroTexto, setFiltroTexto] = React.useState('')

  const {professores} = React.useContext(GlobalContext)
  const [professorGerencia, setProfessorGerencia] = React.useState(null)

  function handleClickBtnCadastrarProfessor (){ 
    setModalCadastroProfessorAberto(true)
  }

  React.useEffect (() => {
    setProfessoresLista([...professores])
  }, [professores])

  React.useEffect(() => {
    const removerAcentos = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
  
    if (filtroTexto) {
      setProfessoresLista(professores.filter((professor) => {
        const nomeCompleto = professor.nome + ' ' + professor.sobrenome;
        return removerAcentos(nomeCompleto.toLowerCase()).includes(removerAcentos(filtroTexto.toLowerCase()));
      }));
    } else {
      setProfessoresLista([...professores]);
    }
  }, [filtroTexto, professores]);
  



  return (
    <div>
      <div className={styles.header}>
        <h1>Gerenciamento de professores</h1>
        <div className={styles.headerButtons}>
          <button onClick={handleClickBtnCadastrarProfessor}>Cadastrar Professor +</button>
        </div>

        <div>
          <label className={styles.filtroPorNome}>Filtro
            <input type="text" value={filtroTexto} onChange={(e) => setFiltroTexto(e.target.value)} />
          </label>
        </div>
      </div>
      {professores.length > 0 ? 
        <ul className={styles.listaDeProfessores}>
        {professoresLista.map((professor) => {
            return (
                <li key={professor._id}>
                  <CardProfessor
                    professor={professor}
                    setProfessorGerencia={setProfessorGerencia}
                    setModalGerenciarProfessorAberto={setModalGerenciarProfessorAberto}
                    />
                </li>
            )
        })}
        </ul>
        : <div className={styles.nenhuma}>Nenhum professor cadastrado...</div>}
      
        <ModalCadastroProfessor modalCadastroProfessorAberto={modalCadastroProfessorAberto} setModalCadastroProfessorAberto={setModalCadastroProfessorAberto}/>

        <ModalGerenciarProfessor modalGerenciarProfessorAberto={modalGerenciarProfessorAberto} setModalGerenciarProfessorAberto={setModalGerenciarProfessorAberto} professor={professorGerencia}/>
    </div>
  );
};

export default Professores;
