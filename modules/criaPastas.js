const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.post('/', validateApiKey, async (req, res) => {
  const { name, userid } = req.body; 

  try {
    console.log('Criando pasta:', name);
    const result = await db.one('INSERT INTO pastas (name, userid) VALUES ($1, $2) RETURNING *', [name, userid]);
    res.json(result);
  } catch (error) {
    console.error('Erro ao criar uma nova pasta:', error);
    res.status(500).send('Erro Interno do Servidor');
  }
});

module.exports = router;
