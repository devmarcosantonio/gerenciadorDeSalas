const mongoose = require('mongoose');

const DisciplinaSchema = new mongoose.Schema({
  nome: { 
    type: String, 
    required: true, 
    unique: true 
  },
  tipo: { 
    type: String, 
    required: true,
    enum: ['informatica', 'experimental', 'teorica'] 
  },
  natureza: {
    type: String,
    required: true,
    enum: ['optativa', 'obrigatoria']
  },
  cargaHoraria: { 
    type: Number, 
    required: true 
  }
});

module.exports = mongoose.model('Disciplina', DisciplinaSchema);
