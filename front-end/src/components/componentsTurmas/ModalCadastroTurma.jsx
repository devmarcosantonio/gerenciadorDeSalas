import React, { useContext, useEffect, useState } from 'react';
import styles from './ModalCadastroTurma.module.css';
import { GlobalContext } from '../../GlobalContext';
import { POST_NOVA_TURMA } from '../../api';

const ModalCadastroTurma = ({ modalCadastroTurmaAberto, idDisciplina, setModalCadastroTurmaAberto, setTurmasDisciplina }) => {
  const [numero, setNumero] = useState('');
  const [qtAlunos, setQtAlunos] = useState('');
  const [idDisciplinaCadastro, setIdDisciplinaCadastro] = useState(idDisciplina || '');
  const [turno, setTurno] = useState('M');
  const { turmas, setTurmas, disciplinas } = useContext(GlobalContext);

  useEffect(() => {
    setIdDisciplinaCadastro(idDisciplina || '');
  }, [idDisciplina]);

  const handleClickCadastrar = async () => {
    if (numero && qtAlunos && turno && idDisciplinaCadastro !== '') {
      const novaDisciplina = { numero: Number(numero), qtAlunos: Number(qtAlunos), turno, idDisciplina: idDisciplinaCadastro };
      try {
        const { url, options } = POST_NOVA_TURMA(novaDisciplina);
        const response = await fetch(url, options);

        if (response.ok) {
          const jsonResponse = await response.json();
          setTurmas([...turmas, jsonResponse.turma]);
          setTurmasDisciplina((turmasDisciplina) => [...turmasDisciplina, jsonResponse.turma]);
          alert('Turma cadastrada com sucesso!');
        } else {
          alert('Erro ao cadastrar a Turma.');
        }
      } catch (error) {
        console.error('Erro ao cadastrar a turma:', error);
        alert('Erro ao cadastrar a turma.');
      }

      setModalCadastroTurmaAberto(false);
    } else {
      alert('Preencha todos os campos!');
    }
  };

  if (!modalCadastroTurmaAberto) {
    return null;
  }

  const handleDisciplinaChange = (event) => {
    const selectedDisciplinaId = event.target.value;
    setIdDisciplinaCadastro(selectedDisciplinaId);
  };

  return (
    <div className={styles.modalFundo}>
      <div className={styles.modal}>
        <h2>Cadastro de Turma</h2>
        <form className={styles.form}>
          <label>
            Número
            <input
              type="number"
              placeholder='6'
              className={styles.inputText}
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </label>

          <label>
            Quantidade de alunos
            <input
              type="number"
              placeholder='50'
              className={styles.inputText}
              value={qtAlunos}
              onChange={(e) => setQtAlunos(e.target.value)}
            />
          </label>

          <label>
            Turno
            <div className={styles.areaRadios}>
              <label>
                <input
                  style={{ marginTop: '10px' }}
                  type="radio"
                  value="M"
                  checked={turno === "M"}
                  onChange={(e) => setTurno(e.target.value)}
                />
                Matutino
              </label>

              <label>
                <input
                  style={{ marginTop: '10px' }}
                  type="radio"
                  value="T"
                  checked={turno === "T"}
                  onChange={(e) => setTurno(e.target.value)}
                />
                Vespertino
              </label>

              <label>
                <input
                  style={{ marginTop: '10px' }}
                  type="radio"
                  value="N"
                  checked={turno === "N"}
                  onChange={(e) => setTurno(e.target.value)}
                />
                Noturno
              </label>
            </div>
          </label>

          <label htmlFor="disciplinaSelect">Filtrar por Disciplina: </label>
          <select id="disciplinaSelect" value={idDisciplinaCadastro} onChange={handleDisciplinaChange}>
            <option value={""}>Selecione a disciplina</option>
            {disciplinas.map((disciplina) => (
              <option key={disciplina._id} value={disciplina._id}>
                {disciplina.nome}
              </option>
            ))}
          </select>

          <div className={styles.areaButtons}>
            <button type="button" onClick={handleClickCadastrar}  className={styles.btnPositivo}>
              Cadastrar
            </button>
            <button type="button" onClick={() => setModalCadastroTurmaAberto(false)}  className={styles.btnNegativo}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCadastroTurma;
