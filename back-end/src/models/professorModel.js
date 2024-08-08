const mongoose = require('mongoose');

const ProfessorSchema = new mongoose.Schema({
  nome: {type: String, require: true},
  sobrenome: {type: String, require: true},
  email: {type: String, require: true},
  cpf: {type: String, unique: true, require: true},
  idDisciplinasAptas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina' }],
  qtTurmas: {type: Number, default: 0}
});

module.exports = mongoose.model('Professor', ProfessorSchema);
