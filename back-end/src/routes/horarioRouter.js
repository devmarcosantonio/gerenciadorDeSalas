const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horarioController')
const turmaController = require('../controllers/turmaController')

// Read all
router.get('/', horarioController.buscarTodosHorarios);

router.post('/alocar', turmaController.middlewareAlocarTurma , horarioController.alocarHorarios)

router.delete('/desalocar', horarioController.desalocarHorarioPorId)

module.exports = router;