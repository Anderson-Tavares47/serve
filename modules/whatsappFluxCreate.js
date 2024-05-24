const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.post('/', validateApiKey, async (req, res) => {
  const { name, id_pasta, content } = req.body;

  try {
    console.log('Criando flux:', name);
    const result = await db.one('INSERT INTO whatsapp_flux (name, id_pasta, content) VALUES ($1, $2, $3) RETURNING *', [name, id_pasta, content]);
    res.json(result);
  } catch (error) {
    console.error('Erro ao criar um novo flux:', error);
    res.status(500).send('Erro Interno do Servidor');
  }
});

module.exports = router;
