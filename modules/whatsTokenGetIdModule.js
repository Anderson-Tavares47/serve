const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.get('/:id', validateApiKey, async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await db.one('SELECT * FROM whatsToken WHERE id = $1', [id]);
      res.json(result);
    } catch (error) {
      console.error('Erro ao obter token:', error);
      res.status(500).send('Erro Interno do Servidor');
    }
  });
  
  module.exports = router;
  