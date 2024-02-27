const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.get('/', validateApiKey, async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM planos');
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao obter informações dos planos:', error);
        res.status(500).send('Erro Interno do Servidor');
    }
});

module.exports = router;
