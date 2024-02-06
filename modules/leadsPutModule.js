const express = require('express');
const router = express.Router();
const db = require('../db');

router.put('/:id', async (req, res) => {
    const leadId = req.params.id;
    const { nome, celular, email, tag } = req.body;

    try {
        const result = await db.query('UPDATE leads SET nome = $1, celular = $2, email = $3, tag = $4 WHERE id = $5 RETURNING *', [nome, celular, email, tag, leadId]);

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Lead não encontrado');
        }
    } catch (error) {
        console.error('Erro ao atualizar lead:', error);
        res.status(500).send('Erro Interno do Servidor');
    }
});

module.exports = router;
