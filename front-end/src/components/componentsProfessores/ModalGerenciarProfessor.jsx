import React from 'react';
import { GlobalContext } from '../../GlobalContext';
import { PUT_UPDATE_PROFESSOR } from '../../api';
import styles from './ModalGerenciarProfessor.module.css';

export default function ModalGerenciarProfessor({ professor, modalGerenciarProfessorAberto, setModalGerenciarProfessorAberto }) {
  const { disciplinas, setProfessores, professores, sistemaDeAlocacao} = React.useContext(GlobalContext);

  const [nome, setNome] = React.useState('');
  const [sobrenome, setSobrenome] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [disciplinasSelecionadas, setDisciplinasSelecionadas] = React.useState([]);
  const [filtroTexto, setFiltroTexto] = React.useState('');
  const [disciplinasLista, setDisciplinasLista] = React.useState([]);

  React.useEffect(() => {
    if (modalGerenciarProfessorAberto && professor) {
      setNome(professor.nome);
      setSobrenome(professor.sobrenome);
      setCpf(professor.cpf);
      setEmail(professor.email);
      setDisciplinasSelecionadas(professor.idDisciplinasAptas);
    }
  }, [modalGerenciarProfessorAberto, professor]);

  const removerAcentos = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  React.useEffect(() => {
    if (filtroTexto) {
      setDisciplinasLista(disciplinas.filter((disciplina) => 
        removerAcentos(disciplina.nome.toLowerCase()).includes(removerAcentos(filtroTexto.toLowerCase()))
      ));
    } else {
      setDisciplinasLista([...disciplinas]);
    }
  }, [filtroTexto, disciplinas]);


  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setDisciplinasSelecionadas([...disciplinasSelecionadas, value]);
    } else {
      setDisciplinasSelecionadas(disciplinasSelecionadas.filter((item) => item !== value));
    }
  };

  if (!modalGerenciarProfessorAberto) return null;

  const handleClickAtualizar = async () => {
    if (nome && sobrenome && cpf && email) {
        const body = {id: professor._id, novosDados:{nome, sobrenome, email, idDisciplinasAptas: disciplinasSelecionadas}}
        try {
          const {url, options} = PUT_UPDATE_PROFESSOR (body);
          const response = await fetch(url, options);
  
          if (response.ok) {
            const jsonResponse = await response.json()
            const professorAtualizado = jsonResponse.professor

            console.log(professorAtualizado)
            setProfessores(professores.map((p) => {
                if (p._id === professorAtualizado._id) {
                    return professorAtualizado
                } else {
                    return p
                }
            }))
            alert('Professor atualizado com sucesso!');
          } else {
            alert('Erro ao atualizar o professor.');
          }
        } catch (error) {
          console.error('Erro ao cadastrar o professor:', error);
          alert('Erro ao cadastrar o professor.');
        }
  
        setModalGerenciarProfessorAberto(false)
      } else {
        alert('Preencha todos os campos!');
      }
  };

  return (
    <div className={styles.modalFundo}>
      <div className={styles.modal}>
        <h2>Gerenciar informações do Professor</h2>
        <form className={styles.form}>
          <label>
            Nome
            <input
              type="text"
              placeholder='Marcos'
              className={styles.inputText}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>

          <label>
            Sobrenome
            <input
              type="text"
              placeholder='Antonio'
              className={styles.inputText}
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
            />
          </label>

          <label>
            CPF
            <input
              type="text"
              placeholder='XXXXXXXXXX'
              className={styles.inputText}
              value={cpf}
              disabled={true}
              onChange={(e) => setCpf(e.target.value)}
            />
          </label>

          <label>
            Email
            <input
              type="text"
              placeholder='email@dominio.com'
              className={styles.inputText}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <h2>Disciplinas aptas</h2>
          <label className={styles.filtroPorNome}>Filtro: 
            <input type="text" value={filtroTexto} onChange={(e) => setFiltroTexto(e.target.value)}/>
          </label>
          <div className={styles.overflow}>
            {disciplinasLista.map((d) => (
              <div key={d._id}>
                <input
                  type="checkbox"
                  value={d._id}
                  checked={disciplinasSelecionadas.includes(d._id)}
                  onChange={handleCheckboxChange}
                />
                <label>{d.nome}</label>
                
              </div>
              
            ))}
            {disciplinasLista.length === 0 && 'Nenhuma disciplina'}
          </div>

          <div className={styles.areaButtons}>
            <button type="button" onClick={handleClickAtualizar} className={styles.btnPositivo}>
              Atualizar
            </button>
            <button type="button" onClick={() => setModalGerenciarProfessorAberto(false)}  className={styles.btnNegativo}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
