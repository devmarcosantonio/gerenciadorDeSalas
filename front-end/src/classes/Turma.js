class Turma {
    constructor(id, numero, idDisciplina, idProfessor, idSala, alocada, qtAlunos, turno, idHorarios ) {
        this.id = id;
        this.numero = numero;
        this.idDisciplina = idDisciplina;
        this.turno = turno;
        this.alocada = alocada;
        this.idSala = idSala;
        this.idProfessor = idProfessor;
        this.qtAlunos = qtAlunos
        this.idHorarios = idHorarios || []
    }

    alocarProfessor (idProfessor) {
        this.idProfessor = idProfessor
    }
}
export default Turma
