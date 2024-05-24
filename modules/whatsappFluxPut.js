const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.put('/:id', validateApiKey, async (req, res) => {
  const { id } = req.params;
  const { idUser, id_pasta, name, nodes, edges } = req.body;
  const content = { idUser, id_pasta, name, nodes, edges };

  try {
    const result = await db.one('UPDATE whatsapp_flux SET content = $1 WHERE id = $2 RETURNING *', [content, id]);
    res.json(result);
  } catch (error) {
    console.error('Erro ao atualizar registro de whatsapp_flux:', error);
    res.status(500).send('Erro Interno do Servidor');
  }
});

module.exports = router;

  
