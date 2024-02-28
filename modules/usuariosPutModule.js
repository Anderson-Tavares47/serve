const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require('./validateApiKey');

// Rota para obter todos os usuários
router.get('/', validateApiKey, async (req, res) => {
  try {
    console.log("Obtendo todos os usuários...");
    const users = await db.any('SELECT * FROM usuarios');
    res.json(users);
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    res.status(500).send('Erro Interno do Servidor');
  }
});

module.exports = router;

