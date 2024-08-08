import React, { useEffect } from 'react';
import styles from './CardTurma.module.css';
import { GlobalContext } from '../../GlobalContext';
import { DELETE_TURMA } from '../../api';

const CardTurma = ({ turma, setTurmasDisciplina, setModalGerenciarTurmaAberto, setTurmaGerencia }) => {
    const { _id, numero, qtAlunos, turno, alocada, idDisciplina, idHorarios, idProfessor } = turma;
    const { turmas, setTurmas, sistemaDeAlocacao } = React.useContext(GlobalContext);
    const [disciplina, setDisciplina] = React.useState({ nome: '' });

    useEffect(() => {
        if (turma && sistemaDeAlocacao) {
            setDisciplina(sistemaDeAlocacao.getDisciplinaPorId(idDisciplina));
        }
    }, [turma, sistemaDeAlocacao, idDisciplina]);

    async function handleClickRemoverTurma() {
        const confirmacao = window.confirm('Você tem certeza que deseja remover essa turma?');
        if (confirmacao) {
            try {
                const { url, options } = DELETE_TURMA({ id: _id });
                const response = await fetch(url, options);
                console.log('Resposta foi OK?', response.ok);


                if (response.ok) {
                    const responseJson = await response.json();
                    setTurmas(turmas.filter((turma) => turma._id !== responseJson.turma._id));
                    setTurmasDisciplina((turmas) => turmas.filter((turma) => turma._id !== responseJson.turma._id));
                    alert('Turma excluída com sucesso!');
                } else {
                    alert('Erro ao excluir turma.');
                }
            } catch (error) {
                console.error('Erro ao excluir turma:', error);
                alert('Erro ao excluir turma.');
            }
        }
    };

    function handleClickGerenciarTurma() {
        setTurmaGerencia(turma);
        setModalGerenciarTurmaAberto(true);
    };

    // Lógica para formatar dias e períodos
    let dias = new Set();
    let periodos = new Set();

    if (alocada && sistemaDeAlocacao) {
        idHorarios.forEach(idHorario => {
            const { diaDaSemana, periodo } = sistemaDeAlocacao.getHorarioPorId(idHorario);
            dias.add(diaDaSemana);
            periodos.add(periodo);
        });
    }

    return (
        <div className={styles.card}>
            <h3>Turma {numero} - {disciplina.nome}</h3>
            <div className={styles.cardInfo}>
                <p>Alocada: <span style={{ color: alocada ? 'green' : 'brown' }}>
                    {alocada ? `Sala ${turma.idSala ? sistemaDeAlocacao.getSalaPorId(turma.idSala).nome : 'Nenhuma sala'} - Horário: ${Array.from(dias).join('')}${turno}${Array.from(periodos).join('')}` : "Não alocado para nenhuma sala"}
                </span></p>
                <p>Professor: <span style={{ color: idProfessor ? 'green' : 'brown' }}>
                    {idProfessor ? `${sistemaDeAlocacao.getProfessorPorId(idProfessor).nome} ${sistemaDeAlocacao.getProfessorPorId(idProfessor).sobrenome}` : 'Sem professor'}
                </span></p>
                <p>Quantidade de alunos: {qtAlunos} alunos</p>
                <p>Turno: {turno === 'M' ? 'matutino' : turno === 'T' ? 'vespertino' : 'noturno'}</p>
            </div>
            <div className={styles.cardButtons}>
                <button idd={_id} onClick={handleClickGerenciarTurma} className={styles.btnGerenciarTurma}>Gerenciar Turma</button>
                <button idd={_id} onClick={handleClickRemoverTurma} className={styles.btnRemover}>Remover</button>
            </div>
        </div>
    );
};

export default CardTurma;
