const express = require('express');
const router = express.Router();

const disciplinaController = require('../controllers/disciplinaController')
const turmaController = require('../controllers/turmaController');

// Create
router.post('/cadastrar', disciplinaController.cadastrarDisciplina);

// Read all
router.get('/', disciplinaController.buscarTodasDisciplinas);

// Read one
router.get('/:id', disciplinaController.buscarDisciplinaPorId);

// Delete
router.delete('/deletar', turmaController.middlewareDeletarTodasTurmasDaDisciplina, disciplinaController.deletarDisciplinaPorId);

// Read one
router.get('/:id/turmas', turmaController.buscarTodasTurmasPorIdDisciplina);

module.exports = router;
