const express = require('express');
const db = require('../db');
const router = express.Router();
const validateApiKey = require('./validateApiKey');

router.get('/:userid', validateApiKey, async (req, res) => {
  const userid = req.params.userid;

  try {
    const usuario = await db.oneOrNone('SELECT * FROM planos WHERE userid = $1', [userid]);

    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao recuperar usuário por userid:', error);
    res.status(500).json({ error: 'Erro ao recuperar usuário por userid' });
  }
});

module.exports = router;
