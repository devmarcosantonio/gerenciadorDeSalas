const express = require('express');

const router = express.Router();
const salaController = require('../controllers/salaController');
const horarioController = require('../controllers/horarioController');

// Cadastrar nova sala
router.post('/cadastrar', salaController.cadastrarSala);

// Pegar todas salas
router.get('/', salaController.buscarTodasSalas);

// pegar sala por id
router.get('/:id', salaController.buscarSalaPorId);

// pegar todos horários da sala específica por id
router.get('/:id/horarios', horarioController.buscarTodosHorariosDeSalaPorIdSala);

// Deletar sala por id
router.delete('/deletar', horarioController.middlewareDeletarTodosHorariosDaSala, salaController.deletarSalaPorId);

module.exports = router;
