import React, { useEffect, useState, useContext } from 'react';
import styles from './ModalCadastroProfessor.module.css'
import { GlobalContext } from '../../GlobalContext';
import { POST_NOVO_PROFESSOR } from '../../api';

const ModalCadastroProfessor = ({ modalCadastroProfessorAberto, setModalCadastroProfessorAberto }) => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [disciplinasSelecionadas, setDisciplinasSelecionadas] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [disciplinasLista, setDisciplinasLista] = useState([]);

  const { professores, setProfessores, disciplinas } = useContext(GlobalContext);

  useEffect(() => {
    setDisciplinasLista([...disciplinas]);
  }, [disciplinas]);

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


  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setDisciplinasSelecionadas([...disciplinasSelecionadas, value]);
    } else {
      setDisciplinasSelecionadas(disciplinasSelecionadas.filter((item) => item !== value));
    }
  };

  const handleClickCadastrar = async () => {
    if (nome && sobrenome && cpf && email) {
      const novoProfessor = { nome, sobrenome, cpf, email, idDisciplinasAptas: disciplinasSelecionadas };
      try {
        const { url, options } = POST_NOVO_PROFESSOR(novoProfessor);
        const response = await fetch(url, options);

        if (response.ok) {
          const jsonResponse = await response.json();
          setProfessores([...professores, jsonResponse.professor]);
          alert('Professor cadastrado com sucesso!');
          setNome('');
          setSobrenome('');
          setCpf('');
          setEmail('');
          setDisciplinasSelecionadas([]);
        } else {
          alert('Erro ao cadastrar o professor.');
        }
      } catch (error) {
        console.error('Erro ao cadastrar o professor:', error);
        alert('Erro ao cadastrar o professor.');
      }

      setModalCadastroProfessorAberto(false);
    } else {
      alert('Preencha todos os campos!');
    }
  };

  if (!modalCadastroProfessorAberto) {
    return null;
  }

  return (
    <div className={styles.modalFundo}>
      <div className={styles.modal}>
        <h2>Cadastro de Professor</h2>
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
          <label className={styles.filtroPorNome}>Filtro
            <input type="text" value={filtroTexto} onChange={(e) => setFiltroTexto(e.target.value)} />
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
            {disciplinasLista.length === 0 ? 'Nenhuma disciplina' : ''}
          </div>

          <div className={styles.areaButtons}>
            <button type="button" onClick={handleClickCadastrar} className={styles.btnPositivo}>
              Cadastrar
            </button>
            <button type="button" onClick={() => setModalCadastroProfessorAberto(false)} className={styles.btnNegativo}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCadastroProfessor;
