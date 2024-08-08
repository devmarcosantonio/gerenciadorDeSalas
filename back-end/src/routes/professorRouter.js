const express = require('express');
const router = express.Router();
const Professor = require('../models/professorModel');
const professorController = require('../controllers/professorController')

// Create
router.post('/cadastrar', professorController.cadastrarProfessor);

// Read all
router.get('/', professorController.buscarTodosProfessores);

// Read one
router.get('/:id', professorController.buscarProfessorPorId);

// Rota para atualizar um professor
router.put('/', professorController.atualizarProfessor);

// Delete
router.delete('/deletar', professorController.deletarProfessorPorId);

module.exports = router;
