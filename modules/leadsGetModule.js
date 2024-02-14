const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.get('/', validateApiKey, async (req, res) => {
    try {
        const leads = await db.query('SELECT * FROM leads');
        res.status(200).json(leads.rows);
    } catch (error) {
        console.error('Erro ao recuperar leads:', error);
        res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
});

module.exports = router;
