const express = require('express');
const db = require('../db');
const router = express.Router();
const validateApiKey = require('./validateApiKey');

router.get('/', validateApiKey, async (req, res) => {
  try {
    const usuarios = await db.any('SELECT * FROM pastas');

    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Erro ao recuperar usuários:', error);
    res.status(500).json({ error: 'Erro ao recuperar usuários' });
  }
});

module.exports = router;
