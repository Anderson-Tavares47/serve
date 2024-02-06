const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM leads');
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao obter leads:', error);
        res.status(500).send('Erro Interno do Servidor');
    }
});

module.exports = router;
