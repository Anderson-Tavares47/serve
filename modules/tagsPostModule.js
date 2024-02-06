const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
    const { tag } = req.body;

    try {
        const result = await db.query('INSERT INTO tags (tag) VALUES ($1) RETURNING *', [tag]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao adicionar tag:', error);
        res.status(500).send('Erro Interno do Servidor');
    }
});

module.exports = router;