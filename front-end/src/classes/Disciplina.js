class Disciplina {
    constructor(id, nome, tipo, natureza, cargaHoraria) {
        this.id = id;
        this.nome = nome;
        this.cargaHoraria = cargaHoraria; // 30, 60 ou 90
        this.tipo = tipo,
        this.natureza = natureza
    }
}

export default Disciplina