const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.get('/', validateApiKey, async (req, res) => {
  try {
    const result = await db.any('SELECT * FROM whatsapp_flux');
    res.json(result);
  } catch (error) {
    console.error('Erro ao obter registros de whatsapp_flux:', error);
    res.status(500).send('Erro Interno do Servidor');
  }
});

module.exports = router;

  
