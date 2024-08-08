const express = require('express');

// Importa os controladores necessários para manipular as requisições às rotas
const turmaController = require('../controllers/turmaController');
const horarioController = require('../controllers/horarioController');
const disciplinaController = require('../controllers/disciplinaController');

// Cria um objeto router do Express para definir as rotas
const router = express.Router();

// Rota para cadastrar uma nova turma
router.post('/cadastrar', disciplinaController.middlewareVerificarDisciplinaExiste, turmaController.cadastrarTurma);

// Rota para buscar todas as turmas
router.get('/', turmaController.buscarTodasTurmas);

// Rota para deletar uma turma por ID
router.delete('/deletar', horarioController.middlewareDeletarTodosHorariosDaTurma, turmaController.deletarTurmaPorId);

// Rota para desalocar uma turma por ID
router.put('/desalocar', horarioController.middlewareDeletarTodosHorariosDaTurma, turmaController.desalocarTurma);

// Rota para definir um professor para uma turma
router.put('/definirProfessor', turmaController.definirProfessorTurma);

// Exporta o objeto router para ser utilizado em outros arquivos
module.exports = router;
