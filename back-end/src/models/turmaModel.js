const mongoose = require('mongoose');

const TurmaSchema = new mongoose.Schema({
  numero: { type: Number, required: true },
  idProfessor: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor', default: null },
  idDisciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina', required: true },
  idSala: { type: mongoose.Schema.Types.ObjectId, ref: 'Sala', default: null },
  qtAlunos: { type: Number, required: true },
  alocada: { type: Boolean, default: false },
  turno: { type: String, required: true, enum: ['M', 'T', 'N'] },
  idHorarios: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Horario',
    default: []
  }],
});

// Índice composto para garantir que o número da turma seja único para cada disciplina
TurmaSchema.index({ numero: 1, idDisciplina: 1 }, { unique: true });

module.exports = mongoose.model('Turma', TurmaSchema);
