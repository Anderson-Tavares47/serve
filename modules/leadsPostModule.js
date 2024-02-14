const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.post('/', validateApiKey, async (req, res) => {
    const { nome, celular, email, tag } = req.body;

    try {
        const result = await db.query('INSERT INTO lead (nome, celular, email, tag) VALUES ($1, $2, $3, $4) RETURNING *', [nome, celular, email, tag]);
        console.log(result)

        if (result.rows.length > 0) {
            res.status(201).json(result.rows[0]); // Retorna o lead inserido com o status 201 (Created)
        } else {
            res.status(500).send('Erro Interno do Servidor: Nenhum resultado retornado após a inserção.');
        }
    } catch (error) {
        console.error('Erro ao adicionar lead:', error);
        res.status(500).send('Erro Interno do Servidor');
    }
});

module.exports = router;
