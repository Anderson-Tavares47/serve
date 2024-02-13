const express = require('express');
const db = require('../db');
const router = express.Router();
const validateApiKey = require('./validateApiKey');

router.get('/:id', validateApiKey, async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await db.one('SELECT * FROM pastas WHERE id = $1', id);

    res.status(200).json(usuario);
  } catch (error) {
    console.error('Erro ao recuperar o usuário por ID:', error);
    res.status(500).json({ error: 'Erro ao recuperar o usuário por ID' });
  }
});

module.exports = router;
