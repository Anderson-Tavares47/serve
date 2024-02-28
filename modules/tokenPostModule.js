const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');


router.post('/', validateApiKey, async (req, res) => {
    const { nome, token, iduser } = req.body;

    try {
        const result = await db.query('INSERT INTO tokens (nome, token, iduser) VALUES ($1, $2, $3) RETURNING *', [nome, token, iduser]);
        
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao criar um novo token:', error);
        res.status(500).send('Erro Interno do Servidor');
    }
});

module.exports = router;
