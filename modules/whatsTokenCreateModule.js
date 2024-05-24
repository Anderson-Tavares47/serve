const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.post('/', validateApiKey, async (req, res) => {
  const { idUser, token } = req.body;

  try {
    console.log('Criando token:', token);
    const result = await db.one('INSERT INTO whatstoken (idUser, token) VALUES ($1, $2) RETURNING *', [idUser, token]);
    res.json(result);
  } catch (error) {
    console.error('Erro ao criar um novo token:', error);
    res.status(500).send('Erro Interno do Servidor');
  }
});

module.exports = router;
