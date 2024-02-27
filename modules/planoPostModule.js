const express = require('express');
const router = express.Router();

// Importa o módulo do banco de dados e a função de validação da chave da API
const db = require('../db');
const validateApiKey = require('./validateApiKey');

// Rota para lidar com requisições POST para criar um novo plano
router.post('/', validateApiKey, async (req, res) => {
    // Extrai os dados do corpo da requisição
    const { nome, valor, descricao } = req.body;

    try {
        // Insere um novo plano no banco de dados e retorna os dados inseridos
        const result = await db.query('INSERT INTO planos (nome, valor, descricao) VALUES ($1, $2, $3) RETURNING *', [nome, valor, descricao]);
        
        // Responde com o status 201 (Created) e os dados do plano criado em JSON
        res.status(201).json(result.rows[0]);
    } catch (error) {
        // Em caso de erro, registra o erro no console e responde com o status 500 (Internal Server Error)
        console.error('Erro ao criar um novo plano:', error);
        res.status(500).send('Erro Interno do Servidor');
    }
});

// Exporta o router para uso em outros arquivos
module.exports = router;
