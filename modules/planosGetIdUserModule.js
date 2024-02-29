const express = require('express');
const db = require('../db');
const router = express.Router();
const validateApiKey = require('./validateApiKey');

router.get('/:id', validateApiKey, async (req, res) => {
  const id = req.params.id;

  try {
    const usuario = await db.oneOrNone('SELECT * FROM usuarios WHERE id = $1', [id]);

    if (usuario) {
      const plano = await db.oneOrNone('SELECT * FROM planos WHERE id = $1', [usuario.plano]);

      if (plano) {
        res.status(200).json({ usuario, plano });
      } else {
        res.status(404).json({ message: 'Plano não encontrado para este usuário' });
      }
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao recuperar usuário e plano:', error);
    res.status(500).json({ error: 'Erro ao recuperar usuário e plano' });
  }
});

module.exports = router;

