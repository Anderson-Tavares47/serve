const express = require('express');
const router = express.Router();

const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.post('/', validateApiKey, async (req, res) => {
    const { nome, valor, descricao } = req.body;

    try {
        const result = await db.query('INSERT INTO planos (nome, valor, descricao) VALUES ($1, $2, $3) RETURNING *', [nome, valor, descricao]);
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao criar um novo plano:', error);
        res.status(500).send('Erro Interno do Servidor');
    }
});

module.exports = router;
