const Disciplina = require('../models/disciplinaModel')

class DisciplinaController {
    async cadastrarDisciplina (req, res) {
        const disciplina = new Disciplina(req.body);
        try {
          await disciplina.save();
          console.log('teste')
          res.status(200).json({'msg': 'disciplina cadastrada com sucesso', 'disciplina': disciplina});
        } catch (error) {
          res.status(400).json({'msg': 'erro ao tentar cadastrar disciplina', 'error': error});
        }
    }

    async buscarTodasDisciplinas (req, res) {
        try {
          const disciplinas = await Disciplina.find();
          res.status(200).json({'msg': 'buscar realizada com sucesso!', 'disciplinas': disciplinas});
        } catch (error) {
          res.status(400).json({'msg': 'erro ao tentar buscar disciplinas!', 'error': error});
        }
    }

    async buscarDisciplinaPorId(req, res) {
        try {
          const disciplina = await Disciplina.findById(req.params.id);
          if (!disciplina) {
            return res.status(404).json({'msg': 'disciplina não encontrada!'});
          }
          res.status(200).json({'msg': 'busca realizada com sucesso', 'disciplina': disciplina});
        } catch (error) {
          res.status(400).json({'msg': 'erro ao tentar buscar disciplina!', 'error': error});
        }
    }

    async deletarDisciplinaPorId (req, res) {
        try {
            const disciplina = await Disciplina.findByIdAndDelete(req.body.id);
            if (!disciplina) {
              return res.status(404).json({'msg': 'disciplina não encontrada!'});
            }
            res.status(200).json({'msg': 'disciplina removida com sucesso!', 'disciplina': disciplina});
          } catch (error) {
            res.status(400).json({'msg': 'erro ao tentar remover disciplina!', 'error': error})
          }
    }


    async middlewareVerificarDisciplinaExiste (req, res, next) {
      try {
        const disciplina = await Disciplina.findById(req.body.idDisciplina);
        if (!disciplina) {
          return res.status(404).json({'msg': 'disciplina não existe!'});
        }
        next()
      } catch (error) {
        res.status(400).json({'msg': 'erro ao tentar buscar disciplina!', 'error': error});
      }
    }
}

module.exports = new DisciplinaController

