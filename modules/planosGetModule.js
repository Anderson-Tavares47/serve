const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.get('/:id', validateApiKey, async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('SELECT * FROM planos WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Plano não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao obter informações do plano:', error);
        res.status(500).send('Erro Interno do Servidor');
    }
});

module.exports = router;
