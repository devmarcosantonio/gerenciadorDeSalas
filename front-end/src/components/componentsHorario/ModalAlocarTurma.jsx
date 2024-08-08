import React, { useEffect } from 'react';
import { GlobalContext } from '../../GlobalContext';
import styles from './ModalAlocarTurma.module.css';
import { POST_NOVO_HORARIO } from '../../api';

const ModalAlocarTurma = ({ modalAlocarTurmaAberto, setModalAlocarTurmaAberto }) => {
  const {sistemaDeAlocacao, idSala, setHorarios, horarios} = React.useContext(GlobalContext);
  const [turmasDesalocadas, setTurmasDesalocadas] = React.useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = React.useState('');
  const [disciplinaTurmaSelecionada, setDisciplinaTurmaSelecionada] = React.useState(null);
  const [periodosSelecionados, setPeriodosSelecionados] = React.useState(null)
  const [diasSelecionados, setDiasSelecionados] = React.useState([]);
//   const [selectsDiaDaSemana, setSelectsDiaDaSemana] = useState([]);

  useEffect(() => {
    if (sistemaDeAlocacao) {
      let turmasSemSala = sistemaDeAlocacao.getTurmasDesalocadasParaSala(idSala);
      if (turmasSemSala) {
        turmasSemSala = turmasSemSala.map((t) => {
            return {...t, disciplina: sistemaDeAlocacao.getDisciplinaPorId(t.idDisciplina)}
        })

        setTurmasDesalocadas(turmasSemSala)
      }
    }
  }, [sistemaDeAlocacao]);

  const handleChangeTurma = (event) => {
    const turmaId = event.target.value;
    setTurmaSelecionada(turmaId);

    const disciplina = turmasDesalocadas.find(turma => turma.id === turmaId).disciplina;
    if (disciplina) {
      setDisciplinaTurmaSelecionada(disciplina);
    }
  };


  const handleDiaDaSemanaChange = (index, event) => {
    const newDiasSelecionados = [...diasSelecionados];
    newDiasSelecionados[index] = event.target.value;
    setDiasSelecionados(newDiasSelecionados);
  };

  const handlePeriodoChange = ({target}) => {
    console.log(target.value)
    setPeriodosSelecionados(target.value)
  };


  const renderSelectsDiaDaSemana = () => {
    if (!disciplinaTurmaSelecionada) return null;

    const { cargaHoraria } = disciplinaTurmaSelecionada;
    const totalSelects = cargaHoraria / 30;
    const selects = [];

    for (let i = 0; i < totalSelects; i++) {
      selects.push(
        <select key={i} value={diasSelecionados[i] || ''} onChange={(e) => handleDiaDaSemanaChange(i, e)}>
          <option value="" disabled={true}>Selecione o dia da semana</option>
          <option value="2">Segunda-feira</option>
          <option value="3">Terça-feira</option>
          <option value="4">Quarta-feira</option>
          <option value="5">Quinta-feira</option>
          <option value="6">Sexta-feira</option>
        </select>
      );
    }

    return selects;
  };



  async function handleClickBtnAlocarTurma () {
    
    if (periodosSelecionados && idSala && turmaSelecionada !== '') {
      const turma = sistemaDeAlocacao.getTurmaPorId(turmaSelecionada)
      const body = {
        diasDaSemana: diasSelecionados.map((d) => {
        return Number(d)
      }),
        periodos: periodosSelecionados.split(',').map((p) => {
          return Number(p)
        }),
        idSala, 
        idTurma: turmaSelecionada,
        turno: turma.turno
      }
      
      let verificarDiasIguais = false

      if (body.diasDaSemana.length === 3 && (body.diasDaSemana[0] === body.diasDaSemana[1] || body.diasDaSemana[0] === body.diasDaSemana[2] || body.diasDaSemana[2] === body.diasDaSemana[3])) {
        verificarDiasIguais = true
      } else if (body.diasDaSemana.length === 2) {
        if (body.diasDaSemana[0] === body.diasDaSemana[1]){ verificarDiasIguais = true} 
      } 

      if (!verificarDiasIguais) {
        if (sistemaDeAlocacao.verificarHorariosLivres(body.idSala, body.diasDaSemana, body.turno, body.periodos)) {
          if (!sistemaDeAlocacao.verificarTurmaAlocada(body.idTurma)) {
            const {url, options} = POST_NOVO_HORARIO(body)
            try {
              const response = await fetch(url, options)
            
              if (response.ok) {
                const jsonResponse = await response.json()
                setHorarios(
                  [...horarios, jsonResponse.horarios]
                )
                alert('Turma alocada com sucesso!')
                
                setModalAlocarTurmaAberto(false)
                
              }  
            } catch {
              alert("erro ao tentar alocar turma")
            }
    
          } else {
            alert('Turma já alocada!')
          }
          
        
        
        } else {
          alert('Horário já alocado para outra turma!')
        }
      } else {
        alert('Dias precisam ser diferentes.')
      }
    } else {
      alert('Preencha todos os campos')
    }

      
  }

  if (!modalAlocarTurmaAberto) return null;

  return (
    <div className={styles.modalFundo}>
      <div className={styles.modal}>
        <h1>Alocar uma turma</h1>
        <div className={styles.form}>
          <h2>Turmas Desalocadas</h2>
          <select value={turmaSelecionada} onChange={handleChangeTurma} >
            <option value="">Selecione uma turma</option>
            {turmasDesalocadas.map((turma, index) => (
              <option key={index} value={turma.id}>
                Turma: {turma.numero}, {turma.turno}, {turma.disciplina.nome} ({turma.disciplina.cargaHoraria}h)
              </option>
            ))}
          </select>

          <h2>Dias da semana</h2>
          {renderSelectsDiaDaSemana()}

          <h2>Horários</h2>
          <select value={periodosSelecionados || ''} onChange={(e) => handlePeriodoChange(e)}>
            <option value="">Selecione o horário</option>
            <option value={['1,2']}>1º e 2º horário</option>
            <option value={['3,4']}>3º e 4º horário</option>
            <option value={['5,6']}>5º e 6º horário</option>
          </select>

        </div>

        <div className={styles.areaButtons}>
          <button type="button" onClick={handleClickBtnAlocarTurma} className={styles.btnPositivo}>Alocar Turma</button>
          <button type="button" onClick={() => setModalAlocarTurmaAberto(false)} className={styles.btnNegativo}>Cancelar</button>
        </div>
      </div>

      
    </div>
  );
};

export default ModalAlocarTurma;
