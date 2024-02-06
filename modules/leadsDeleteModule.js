const express = require('express');
const router = express.Router();
const db = require('../db');

router.delete('/:id', async (req, res) => {
    const leadId = req.params.id;

    try {
        const result = await db.query('DELETE FROM leads WHERE id = $1 RETURNING *', [leadId]);

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Lead não encontrado');
        }
    } catch (error) {
        console.error('Erro ao excluir lead:', error);
        res.status(500).send('Erro Interno do Servidor');
    }
});

module.exports = router;