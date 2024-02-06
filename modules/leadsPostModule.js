const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
    const { nome, celular, email, tag } = req.body;

    try {
        const result = await db.query('INSERT INTO leads (nome, celular, email, tag) VALUES ($1, $2, $3, $4) RETURNING *', [nome, celular, email, tag]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao adicionar lead:', error);
        res.status(500).send('Erro Interno do Servidor');
    }
});

module.exports = router;
