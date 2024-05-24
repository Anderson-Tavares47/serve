const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.delete('/:id', validateApiKey, async (req, res) => {
    const { id } = req.params;
  
    try {
      await db.none('DELETE FROM whatstoken WHERE id = $1', [id]);
      res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar token:', error);
      res.status(500).send('Erro Interno do Servidor');
    }
  });
  
  module.exports = router;
  
