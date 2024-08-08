const Sala = require('../models/salaModel');
const Horario = require('../models/horarioModel')

class SalaController {
    async cadastrarSala (req, res) {
      const sala = new Sala(req.body);
      try {
        await sala.save();
        res.status(201).json({'msg': 'Sala cadastrada com sucesso!', 'sala': sala});
      } catch (error) {
        res.status(400).send({'msg': 'Não foi possível criar sala!', 'error': error});
      }
    }

    async buscarSalaPorId (req, res) {
        try {
          const sala = await Sala.findById(req.params.id);
          if (!sala) {
            return res.status(404).json({'msg': 'Sala não existe!'});
          }
          res.status(200).json({'msg': 'Busca feita com sucesso!', 'sala': sala});
        } catch (error) {
          res.status(400).json({'msg': 'Não foi possível realizar a busca!', 'error': error});
        }
      }

    async buscarTodasSalas (req, res) {
        try {
          const salas = await Sala.find();
          res.status(200).json({'msg': 'Busca realizada com sucesso!', 'salas': salas});
        } catch (error) {
          res.status(400).send(error);
        }
    }
  
    async deletarSalaPorId (req, res) {
        try {
          const sala = await Sala.findByIdAndDelete(req.body.id);
          if (!sala) {
            return res.status(404).json({'msg': 'sala não encotrada!'});
          }
          res.status(200).json({'msg': 'sala deletada com sucesso!', 'sala': sala});
        } catch (error) {
          res.status(400).json({'msg': 'erro ao tentar deletar sala', 'error': error});
        }
    }
}

module.exports = new SalaController();