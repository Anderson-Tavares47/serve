const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.delete('/:id', validateApiKey, async (req, res) => {
    const leadId = req.params.id;

    try {
        const result = await db.query('DELETE FROM lead WHERE id = $1 RETURNING *', [leadId]);

        if (result) {
            res.json(result);
        } else {
            res.status(404).send('Lead não encontrado');
        }
    } catch (error) {
        console.error('Erro ao excluir lead:', error);
        res.status(500).send('Erro Interno do Servidor');
    }
});

module.exports = router;
