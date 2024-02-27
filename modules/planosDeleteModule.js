const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.delete('/:id', validateApiKey, async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM planos WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Plano não encontrado' });
        }
        res.json({ message: 'Plano excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir plano:', error);
        res.status(500).send('Erro Interno do Servidor');
    }
});

module.exports = router;
