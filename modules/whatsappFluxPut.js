const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.put('/:id', validateApiKey, async (req, res) => {
    const { id } = req.params;
    const { name, id_pasta, idUser, content } = req.body;
  
    try {
      const result = await db.one('UPDATE whatsapp_flux SET name = $1, id_pasta = $2, idUser = $3, content = $4 WHERE id = $5 RETURNING *', [name, id_pasta, idUser, content, id]);
      res.json(result);
    } catch (error) {
      console.error('Erro ao atualizar registro de whatsapp_flux:', error);
      res.status(500).send('Erro Interno do Servidor');
    }
  });
  
  module.exports = router;
  