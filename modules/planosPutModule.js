const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.put('/:id', validateApiKey, async (req, res) => {
    const { id } = req.params;
    const { nome, valor, descricao, userid } = req.body;
    console.log(id);

    try {
        const result = await db.query('UPDATE planos SET nome = $1, valor = $2, descricao = $3, userid = $4 WHERE id = $5 RETURNING *', [nome, valor, descricao, userid, id]);

        if (result.length === 0)
            return res.status(404).json({ message: 'Plano não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao atualizar informações do plano:', error);
        res.status(500).send('Erro Interno do Servidor');
    }
});

module.exports = router;
