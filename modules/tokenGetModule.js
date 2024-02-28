const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.get('/:id', validateApiKey, async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('SELECT * FROM tokens WHERE id = $1', [id]);
        
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Token não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao buscar o token:', error);
        res.status(500).send('Erro Interno do Servidor');
    }
});

module.exports = router;
