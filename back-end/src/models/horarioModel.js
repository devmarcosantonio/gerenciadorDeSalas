const mongoose = require('mongoose');

const HorarioSchema = new mongoose.Schema({
  idSala: { type: mongoose.Schema.Types.ObjectId, ref: 'Sala', required: true },
  idTurma: { type: mongoose.Schema.Types.ObjectId, ref: 'Turma', default: null },
  diaDaSemana: { type: Number, required: true, enum: [2, 3, 4, 5, 6]},
  turno: {
    type: String,
    required: true,
    enum: ['M', 'T', 'N']
  },
  periodo: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  }
});

module.exports = mongoose.model('Horario', HorarioSchema);