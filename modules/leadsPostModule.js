const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.post('/', validateApiKey, async (req, res) => {
    const { nome, celular, email, tag, userid } = req.body;

    try {
        const result = await db.query('INSERT INTO lead (nome, celular, email, tag, userid) VALUES ($1, $2, $3, $4, $5) RETURNING *', [nome, celular, email, tag, userid]);

        console.log(result);

        if (result.length) {
            res.status(201).json(result);
        } else {
            res.status(500).send('Erro Interno do Servidor: Nenhum resultado retornado após a inserção.');
        }
    } catch (error) {
        console.error('Erro ao adicionar lead:', error);
        res.status(500).send('Erro Interno do Servidor');
    }
});

module.exports = router;
