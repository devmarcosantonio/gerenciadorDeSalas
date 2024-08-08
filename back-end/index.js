// Importa o módulo express para criar um servidor web.
const express = require('express');

// Importa o módulo mongoose para conectar e interagir com o MongoDB.
const mongoose = require('mongoose')

// Importa o módulo cors para habilitar o CORS (Cross-Origin Resource Sharing) no servidor.
const cors = require('cors');

// Importa os roteadores das rotas específicas para professores, salas, horários, disciplinas e turmas.
const professorRouter = require('./src/routes/professorRouter');
const salaRouter = require('./src/routes/salaRouter');
const horarioRouter = require('./src/routes/horarioRouter');
const disciplinaRouter = require('./src/routes/disciplinaRouter');
const turmaRouter = require('./src/routes/turmaRouter');

// Define a porta em que o servidor irá rodar.
const _PORT = 5000

// Conecta ao banco de dados MongoDB usando o mongoose. A string de conexão inclui as credenciais e o endereço do banco de dados.
mongoose.connect('mongodb+srv://cabict:cabictmelhorca@cluster0.uyyvml0.mongodb.net/')
    .then((db) => {
        // Cria uma aplicação Express.
        const app = express();
        
        // Usa o middleware CORS para permitir requisições de outras origens.
        app.use(cors());
        
        // Usa o middleware express.json() para permitir que a aplicação parseie JSON no corpo das requisições.
        app.use(express.json())
        
        // Define as rotas da aplicação, associando cada caminho a um roteador específico.
        app.use('/api/salas', salaRouter);
        app.use('/api/horarios', horarioRouter);
        app.use('/api/professores', professorRouter);
        app.use('/api/disciplinas', disciplinaRouter);
        app.use('/api/turmas', turmaRouter);

        // Inicia o servidor na porta especificada e exibe uma mensagem de erro se não conseguir iniciar.
        app.listen(_PORT, (err) => {
            if (err) console.log('erro ao tentar abrir servidor: ', err);
            console.log('Servidor rodando na porta', _PORT);
        })

    })
    .catch ((error) => {
        // Exibe uma mensagem de erro se não conseguir se conectar ao banco de dados.
        console.log('erro ao tentar se conectar ao banco de dados.')
    })
