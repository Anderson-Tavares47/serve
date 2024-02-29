const express = require('express');
const db = require('../db');
const router = express.Router();
const validateApiKey = require('./validateApiKey');

router.get('/:plano', validateApiKey, async (req, res) => {
  const plano = req.params.plano;

  try {
    const usuarios = await db.manyOrNone('SELECT * FROM usuarios WHERE plano = $1', [plano]);

    if (usuarios && usuarios.length > 0) {
      res.status(200).json(usuarios);
    } else {
      res.status(404).json({ message: 'Usuários não encontrados para este plano' });
    }
  } catch (error) {
    console.error('Erro ao recuperar usuários por plano:', error);
    res.status(500).json({ error: 'Erro ao recuperar usuários por plano' });
  }
});

module.exports = router;
