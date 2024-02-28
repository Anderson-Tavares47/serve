const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.get('/:iduser', validateApiKey, async (req, res) => {
    const { iduser } = req.params;

    try {
        const result = await db.query('SELECT * FROM tokens WHERE iduser = $1', [iduser]);
        
        if (result) {
            res.json(result);
        } else {
            res.status(404).send('Token não encontrado para o usuário especificado.');
        }
    } catch (error) {
        console.error('Erro ao buscar o token:', error);
        res.status(500).send('Erro Interno do Servidor');
    }
});

module.exports = router;
