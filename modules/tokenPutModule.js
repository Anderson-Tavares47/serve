const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.put('/:id', validateApiKey, async (req, res) => {
    const { id } = req.params;
    const { nome, token, iduser } = req.body;

    try {
        const result = await db.query('UPDATE tokens SET nome = $1, token = $2, iduser = $3 WHERE id = $4 RETURNING *', [nome, token, iduser, id]);
        
        if (result.rows) {
            res.json(result);
        } else {
            res.status(404).send('Token não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao atualizar o token:', error);
        res.status(500).send('Erro Interno do Servidor');
    }
});

module.exports = router;
