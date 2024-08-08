const mongoose = require('mongoose');

const SalaSchema = new mongoose.Schema({
  nome: { 
    type: String, 
    required: true, 
    unique: true 
  },
  capacidade: { 
    type: Number, 
    required: true 
  },
  tipo: { 
    type: String, 
    required: true,
    enum: ['informatica', 'experimental', 'teorica']
  },
  idHorarios: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Horario', required: true }
  ]
});

module.exports = mongoose.model('Sala', SalaSchema);
