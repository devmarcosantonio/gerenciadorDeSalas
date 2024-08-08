const Turma = require('../models/turmaModel');
const Professor = require('../models/professorModel')

class TurmaController {
  async cadastrarTurma(req, res) {
    const turma = new Turma(req.body);
    try {
      await turma.save();
      res.status(201).json({'msg': 'Turma cadastrada com sucesso!', 'turma': turma});
    } catch (error) {
      res.status(400).send({'msg': 'Não foi possível criar turma!', 'error': error});
    }
  }

  async buscarTodasTurmas(req, res) {
    try {
      const turmas = await Turma.find();
      res.status(200).json({'msg': 'Busca realizada com sucesso!', 'turmas': turmas});
    } catch (error) {
      res.status(400).send({'msg': 'Não foi possível realizar a busca!', 'error': error});
    }
  }

  async desalocarTurma (req, res) {
    const idTurma = req.body.id
    try {
      const turma = await Turma.findByIdAndUpdate(
        idTurma,
        { alocada: false, idSala: null, idProfessor: null},
        { new: true }
      );
      res.status(200).json({'msg': 'Turma desalocada com sucesso!', 'turma': turma});
    } catch (error) {
      res.status(400).send({'msg': 'Não foi possível realizar a desalocacao!', 'error': error});
    }
  }

  async deletarTurmaPorId(req, res) {

    try {
      const turma = await Turma.findByIdAndDelete(req.body.id);
      if (!turma) {
        console.log('n encontrou')
        return res.status(404).json({'msg': 'Turma não encontrada!'});
      }
      console.log('encontrou')
      res.status(200).json({'msg': 'Turma deletada com sucesso!', 'turma': turma});
    } catch (error) {
      console.log('n encontrou msm kkkkkk')
      res.status(400).json({'msg': 'Erro ao tentar deletar turma', 'error': error});
    }
  }

  async definirProfessorTurma(req, res) {
    const { idTurma, idProfessor } = req.body;
    try {
      const turma = await Turma.findByIdAndUpdate(
        idTurma,
        { idProfessor: idProfessor },
        { new: true }
      );
      
      if (!turma) {
        return res.status(404).json({'msg': 'Turma não encontrada!'});
      }
      res.status(200).json({'msg': 'Professor atribuído com sucesso!', 'turma': turma});
    } catch (error) {
      res.status(400).json({'msg': 'Erro ao tentar atribuir professor', 'error': error});
    }
  }

  async middlewareDeletarTodasTurmasDaDisciplina(req, res, next) {
    const idDisciplina = req.body.id;
    if (idDisciplina) {
      try {
        await Turma.deleteMany({ idDisciplina: idDisciplina });
        next();
      } catch (error) {
        res.status(400).json({ 'msg': 'Erro ao tentar deletar turmas da disciplina!', 'error': error });
      }
    } else {
      res.status(400).json({ 'msg': 'Disciplina não informada!' });
    }
  }

  async middlewareAlocarTurma(req, res, next) {
    const {idTurma, idSala} = req.body;
    if (idTurma) {
      try {
        const turma = await Turma.findByIdAndUpdate(
          idTurma,
          { alocada: true, idSala: idSala},
          { new: true }
        );
        next();
      } catch (error) {
        res.status(400).json({ 'msg': 'Erro ao achar turma!', 'error': error });
      }
    } else {
      res.status(400).json({ 'msg': 'Turma não informada!' });
    }
  }

  async buscarTodasTurmasPorIdDisciplina(req, res) {
    const idDisciplina = req.params.idDisciplina;
    if (idDisciplina) {
      try {
        const turmas = await Turma.find({ idDisciplina: idDisciplina });
        if (turmas.length === 0) {
          return res.status(404).json({ 'msg': 'Nenhuma turma encontrada para a disciplina especificada!' });
        }
        res.status(200).json({ 'msg': 'Busca realizada com sucesso!', 'turmas': turmas });
      } catch (error) {
        res.status(400).json({ 'msg': 'Erro ao tentar buscar turmas', 'error': error });
      }
    } else {
      res.status(400).json({ 'msg': 'Disciplina não informada!' });
    }
  }
}

module.exports = new TurmaController();
