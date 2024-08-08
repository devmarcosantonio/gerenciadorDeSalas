import Sala from "./Sala";
import Professor from "./Professor";
import Disciplina from "./Disciplina";
import Turma from "./Turma";
import Horario from "./Horario";

class SistemaDeAlocacao {
    constructor(salas, horarios, professores, disciplinas, turmas) {
        // Inicializa o sistema com listas de objetos convertidos para as classes correspondentes
        this.salas = salas.map((s) => new Sala(s._id, s.nome, s.capacidade, s.tipo, s.idHorarios));
        this.professores = professores.map((p) => new Professor(p._id, p.nome, p.sobrenome, p.email, p.cpf, p.idDisciplinasAptas, p.qtTurmas));
        this.horarios = horarios.map((h) => new Horario(h._id, h.idSala, h.diaDaSemana, h.turno, h.periodo, h.idTurma));
        this.turmas = turmas.map((t) => new Turma(t._id, t.numero, t.idDisciplina, t.idProfessor, t.idSala, t.alocada, t.qtAlunos, t.turno, t.idHorarios));
        this.disciplinas = disciplinas.map((d) => new Disciplina(d._id, d.nome, d.tipo, d.natureza, d.cargaHoraria));
    }

    // Métodos para atualizar listas específicas com novos dados
    atualizarListaSalas(salasAtualizadas) {
        this.salas = salasAtualizadas.map((s) => new Sala(s._id, s.nome, s.capacidade, s.tipo, s.idHorarios));
    }

    atualizarListaHorarios(horariosAtualizados) {
        this.horarios = horariosAtualizados.map((h) => new Horario(h._id, h.idSala, h.diaDaSemana, h.turno, h.periodo, h.idTurma));
    }

    atualizarListaDisciplinas(disciplinasAtualizadas) {
        this.disciplinas = disciplinasAtualizadas.map((d) => new Disciplina(d._id, d.nome, d.tipo, d.natureza, d.cargaHoraria));
    }

    atualizarListaTurmas(turmasAtualizadas) {
        this.turmas = turmasAtualizadas.map((t) => new Turma(t._id, t.numero, t.idDisciplina, t.idProfessor, t.idSala, t.alocada, t.qtAlunos, t.turno, t.idHorarios));
    }

    atualizarListaProfessores(professoresAtualizados) {
        this.professores = professoresAtualizados.map((p) => new Professor(p._id, p.nome, p.sobrenome, p.email, p.cpf, p.idDisciplinasAptas, p.qtTurmas));
    }

    // Métodos para buscar objetos por ID em suas respectivas listas
    getTurmaPorId(idTurma) {
        return this.turmas.find(turma => turma.id === idTurma);
    }

    getDisciplinaPorId(idDisciplina) {
        return this.disciplinas.find(disciplina => disciplina.id === idDisciplina);
    }

    getProfessorPorId(idProfessor) {
        return this.professores.find(professor => professor.id === idProfessor);
    }

    getHorarioPorId(idHorario) {
        return this.horarios.find(horario => horario.id === idHorario);
    }

    getSalaPorId(idSala) {
        return this.salas.find(sala => sala.id === idSala);
    }

    // Métodos para buscar horários específicos
    getHorariosDeSalaPorIdSala(idSala) {
        return this.horarios.filter(horario => horario.idSala === idSala);
    }

    getHorariosDeTurmaPorIdTurma(idTurma) {
        return this.horarios.filter(horario => horario.idTurma === idTurma);
    }

    // Métodos para filtrar e buscar informações específicas
    getTurmasDesalocadas() {
        return this.turmas.filter(turma => turma.alocada === false);
    }

    getTurmasDesalocadasParaSala(idSala) {
        const turmasDesalocadas = this.getTurmasDesalocadas();
        const sala = this.getSalaPorId(idSala);
        const turmasAprovadasParaSala = turmasDesalocadas.filter((t) => {
            const disciplinaTurma = this.getDisciplinaPorId(t.idDisciplina);
            return (disciplinaTurma.tipo === sala.tipo && t.qtAlunos <= sala.capacidade);
        });

        return turmasAprovadasParaSala;
    }

    getTurmasAlocadasDaSala(idSala) {
        return this.turmas.filter(turma => turma.alocada === true && turma.idSala === idSala);
    }

    getTurmasAlocadasSemProfessor() {
        return this.turmas.filter(turma => turma.idProfessor === null && turma.alocada === true);
    }

    getHorarioPorDiaTurnoPeriodo(idSala, dia, turno, periodo) {
        const horario = this.horarios.find(h =>
            h.idSala === idSala &&
            h.diaDaSemana === dia &&
            h.turno === turno &&
            h.periodo === periodo
        );

        return horario ? horario : null;
    }

    verificarHorariosLivres(idSala, dias, turno, periodos) {
        for (let d = 0; d < dias.length; d++) {
            for (let p = 0; p < periodos.length; p++) {
                const horario = this.horarios.find(h =>
                    h.idSala === idSala &&
                    h.diaDaSemana === dias[d] &&
                    h.turno === turno &&
                    h.periodo === periodos[p]
                );
                if (horario) {
                    return false;
                }
            }
        }

        return true;
    }

    // Método para verificar se um professor está livre nos horários especificados
    verificarProfessorLivreNosHorarios(professor, idHorarios) {
        for (let idHorario of idHorarios) {
            const horario = this.getHorarioPorId(idHorario);
            if (horario) {
                const horariosNoMesmoDiaEPeriodo = this.horarios.filter(h =>
                    h.periodo === horario.periodo && h.diaDaSemana === horario.diaDaSemana
                );

                if (horariosNoMesmoDiaEPeriodo) {
                    for (let horario_ of horariosNoMesmoDiaEPeriodo) {
                        const turma_horario = this.getTurmaPorId(horario_.idTurma);
                        if (turma_horario && turma_horario.idProfessor === professor.id) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    // Método para verificar se uma turma está alocada
    verificarTurmaAlocada(idTurma) {
        return this.horarios.some(h => h.idTurma === idTurma);
    }

    // Método para buscar professores aptos e livres para ministrar uma disciplina
    buscarProfessoresAptosLivres(turma) {
        const professoresAptos = this.professores.filter(p => p.idDisciplinasAptas.includes(turma.idDisciplina));
        const professoresAptosLivres = professoresAptos.filter(p => this.verificarProfessorLivreNosHorarios(p, turma.idHorarios));
        return professoresAptosLivres;
    }

    // Método para alocar professores nas turmas que estão alocadas sem professor
    alocarProfessoresNasTurmas() {
        const turmasAlocadasSemProfessor = this.getTurmasAlocadasSemProfessor();

        for (const turma of turmasAlocadasSemProfessor) {
            const professoresAptosLivres = this.buscarProfessoresAptosLivres(turma);
            if (professoresAptosLivres.length > 0) {
                for (const professor of professoresAptosLivres) {
                    turma.alocarProfessor(professor.id);
                }
            } else {
                console.log('Não há professores aptos para ministrar essa disciplina.');
            }
        }
    }

    // Método fictício para simular a atualização do banco de dados
    atualizarBancoDeDados() {
        console.log('Aqui vai ter o código de atualizar BD');
    }
}

export default SistemaDeAlocacao;
