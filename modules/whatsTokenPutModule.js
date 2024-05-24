const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.put('/:id', validateApiKey, async (req, res) => {
    const { id } = req.params;
    const { idUser, token } = req.body;
  
    try {
      const result = await db.one('UPDATE whatsToken SET idUser = $1, token = $2 WHERE id = $3 RETURNING *', [idUser, token, id]);
      res.json(result);
    } catch (error) {
      console.error('Erro ao atualizar token:', error);
      res.status(500).send('Erro Interno do Servidor');
    }
  });
  
  module.exports = router;
  