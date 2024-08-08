const Professor = require('../models/professorModel')

class ProfessorController {
    async cadastrarProfessor (req, res) {
        const professor = new Professor(req.body);
        try {
            await professor.save();
            res.status(200).json({'msg': 'professor cadastrado com sucesso!', 'professor': professor});
        } catch (error) {
            res.status(400).json({'msg': 'não foi possível cadastrar o professor!', 'error': error});
        }
    }

    async buscarTodosProfessores (req, res) {
        try {
            const professores = await Professor.find();
            return res.json({'msg': 'busca realizada com sucesso!', 'professores': professores})
          } catch (error) {
            res.status(400).json({'msg': 'Erro ao buscar os horários.', 'error': error})
          }
    }

    async atualizarProfessor (req, res) {
        const {id, novosDados} = req.body;

        try {
          const professorAtualizado = await Professor.findByIdAndUpdate(id, novosDados,
            { new: true, runValidators: true }
            );
            console.log('passou por aqui')
            if (!professorAtualizado) {
            return res.status(404).json({ msg: 'Professor não encontrado'});
            } 
            console.log('passou por aqui 2')

            res.status(200).json({"professor": professorAtualizado });
        } catch (error) {
            res.status(500).json({ msg: 'Erro ao atualizar professor', 'error': error });
        }
    }

    async buscarProfessorPorId (req, res) {
        try {
        const professor = await Professor.findById(req.params.id);
        if (!professor) {
            return res.status(404).send();
        }
        res.status(200).send(professor);
        } catch (error) {
        res.status(400).send(error);
        }
    };

    async deletarProfessorPorId(req, res) {
        try {
          const professor = await Professor.findByIdAndDelete(req.body.id);
          if (!professor) {
            return res.status(404).json({'msg': 'professor não encontrado!'});
          }
          res.status(200).json({'msg': 'professor deletado com sucesso!', 'professor': professor});
        } catch (error) {
          res.status(400).json({'msg': 'não foi possível deletar o professor', 'error': error});
        }
      }
}

module.exports = new ProfessorController();