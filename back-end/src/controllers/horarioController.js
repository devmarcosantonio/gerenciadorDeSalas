const Horario = require('../models/horarioModel');
const Turma = require('../models/turmaModel')

class HorarioController {
  async alocarHorario (req, res) {
    const horario = new Horario(req.body);
        try {
            await horario.save();
            res.status(201).json({'msg': 'horario alocado com sucesso!', 'horario': horario});
        } catch (error) {
            res.status(400).json({'msg': 'não foi possível alocar o horário!', 'error': error});
        }
  }

  async alocarHorarios (req, res) {
    const {diasDaSemana, periodos, idSala, idTurma, turno} = req.body;

    const horarios = []
    for (let d = 0; d < diasDaSemana.length; d++) {
      for (let p = 0; p < periodos.length; p++) {
        horarios.push({diaDaSemana: diasDaSemana[d], periodo: periodos[p], idSala, idTurma, turno})
      }
    }
   
    try {
      const newHorarios = await Horario.insertMany(horarios);

      await Turma.findByIdAndUpdate(
        idTurma,
        { idHorarios: newHorarios },
        { new: true }
      );

      res.status(200).json({'horarios': newHorarios});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async buscarTodosHorariosDeSalaPorIdSala (req, res) {
    try {
      const horarios = await Horario.find({idSala: req.body.idSala}).exec();
      if (horarios) {
        return res.status(200).json({'msg': 'busca feita com sucesso!', 'horarios': horarios});
      }
    } catch (error) {
      res.status(400).json({'msg': 'Erro ao buscar os horários.', 'error': error})
    }
  }

  async buscarTodosHorarios (req, res) {
    try {
      const horarios = await Horario.find();
      return res.json({'msg': 'busca realizada com sucesso!', 'horarios': horarios})
    } catch (error) {
      res.status(400).json({'msg': 'Erro ao buscar os horários.', 'error': error})
    }
  }

  async desalocarHorarioPorId (req, res) {
    try {
      const horario = await Horario.findByIdAndDelete(req.body.id);
      if (!horario) {
        return res.status(404).json({'msg': 'horário não encotrado!'});
      }
      res.status(200).json({'horario': horario, 'msg':  'Horário deletado com sucesso!'});
    } catch (error) {
      res.status(400).json({'msg': 'Erro ao deletar o horário. o Erro está no atributo "error".', 'error': error});
    }
  }

  // Middleware para deletar todos os horários de uma sala pelo id da sala (usado quando sala for deletada)
  async middlewareDeletarTodosHorariosDaSala(req, res, next) {
    const idSala = req.body.id
    if (idSala) {
      try {
        const horariosDeletados = await Horario.deleteMany({ idSala: idSala });
        
        next();
      } catch (error) {
        res.status(400).json({ 'msg': 'Erro ao tentar deletar horários da sala', 'error': error });
      }
    } else {
      res.status(400).json({ 'msg': 'Sala não informada!' });
    }
  }

  // Middleware para deletar todos os horários de uma sala pelo id da sala (usado quando sala for deletada)
  async middlewareDeletarTodosHorariosDaTurma(req, res, next) {
    const idTurma = req.body.id
    if (idTurma) {
      try {
        await Horario.deleteMany({ idTurma: idTurma });

        next();
      } catch (error) {
        next()
      }
    } else {
      res.status(400).json({ 'msg': 'Turma não informada!' });
    }
  }
}

module.exports = new HorarioController();