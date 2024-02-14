const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.post('/', validateApiKey, async (req, res) => {
    const { nome, celular, email, tag } = req.body;
    console.log(nome, celular, email, tag)

    try {
        const result = await db.query('INSERT INTO leads (nome, celular, email, tag) VALUES ($1, $2, $3, $4) RETURNING *', [nome, celular, email, tag]);

        if (result.rows && Array.isArray(result.rows) && result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(500).send('Erro Interno do Servidor: Nenhum resultado retornado após a inserção.');
        }
    } catch (error) {
        console.error('Erro ao adicionar lead:', error);
        res.status(500).send('Erro Interno do Servidor');
    }
});

module.exports = router;
