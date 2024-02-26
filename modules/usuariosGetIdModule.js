const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require('./validateApiKey');

router.get('/:id', validateApiKey, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await db.one('SELECT * FROM usuarios WHERE id = $1', [id]);
    res.json(user);
  } catch (error) {
    console.error('Erro ao obter usuário por ID:', error);
    res.status(500).send('Erro Interno do Servidor');
  }
});

module.exports = router;