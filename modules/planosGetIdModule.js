const express = require('express');
const db = require('../db');
const router = express.Router();
const validateApiKey = require('./validateApiKey');

router.get('/:id', validateApiKey, async (req, res) => {
  const id = req.params.id;

  try {
    const usuario = await db.oneOrNone('SELECT * FROM pastas WHERE id = $1', [id]);

    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao recuperar usuário por ID:', error);
    res.status(500).json({ error: 'Erro ao recuperar usuário por ID' });
  }
});

module.exports = router;
