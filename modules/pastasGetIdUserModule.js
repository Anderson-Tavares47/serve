const express = require('express');
const db = require('../db');
const router = express.Router();
const validateApiKey = require('./validateApiKey');

router.get('/:userid', validateApiKey, async (req, res) => {
  const { userid } = req.params;

  try {
    const usuario = await db.one('SELECT * FROM pastas WHERE userid = $1', userid);

    res.status(200).json(usuario);
  } catch (error) {
    console.error('Erro ao recuperar o usuário por userid:', error);
    res.status(500).json({ error: 'Erro ao recuperar o usuário por userid' });
  }
});

module.exports = router;
