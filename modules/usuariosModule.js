// Importe o módulo 'express' e 'pg-promise'
const express = require('express');
const db = require('../db'); // Importe o objeto de banco de dados de database.js

// Crie uma instância do roteador do Express
const router = express.Router();

// Defina a rota GET para recuperar todos os usuários
router.get('/', async (req, res) => {
  try {
    // Consulte todos os usuários na tabela 'usuarios'
    const usuarios = await db.any('SELECT * FROM usuarios');

    // Responda com a lista de usuários
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Erro ao recuperar usuários:', error);
    res.status(500).json({ error: 'Erro ao recuperar usuários' });
  }
});

// Exporte o roteador para uso no seu aplicativo principal
module.exports = router;
