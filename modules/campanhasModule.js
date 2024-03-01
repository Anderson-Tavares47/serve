const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.post('/pastas/:id', validateApiKey, async (req, res) => {
  const { id } = req.params;
  const { name, userid } = req.body;

  try {
    const result = await db.one('INSERT INTO campanhas (name, pasta_id, userid) VALUES ($1, $2, $3) RETURNING *', [name, id, userid]);
    res.json(result);
  } catch (error) {
    console.error('Erro ao criar uma nova campanha:', error);
    res.status(500).send('Erro Interno do Servidor');
  }
});

module.exports = router;
