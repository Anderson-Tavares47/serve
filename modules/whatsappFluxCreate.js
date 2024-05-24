const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.post('/', validateApiKey, async (req, res) => {
  const { idUser, id_pasta, name, nodes, edges } = req.body;
  const content = { idUser, id_pasta, name, nodes, edges };

  try {
    console.log('Criando whatsapp_flux:', name);
    const result = await db.one('INSERT INTO whatsapp_flux (content) VALUES ($1) RETURNING *', [content]);
    res.json(result);
  } catch (error) {
    console.error('Erro ao criar um novo whatsapp_flux:', error);
    res.status(500).send('Erro Interno do Servidor');
  }
});

module.exports = router;
