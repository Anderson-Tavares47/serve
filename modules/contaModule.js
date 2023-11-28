const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db');

// Substitua as informações do banco de dados com as fornecidas pelo ElephantSQL
// const db = pgp('postgres://yixmxjjh:146A5tfdyeKyKtGjbBUPxh7ujOaWZFh3@isabelle.db.elephantsql.com/yixmxjjh');

router.post('/', async (req, res) => {
  const { nome, sobrenome, email, senha, isAdmin } = req.body;

  // Hash da senha usando bcrypt (substitua 10 pelo custo desejado)
  if (!senha || typeof senha !== 'string') {
    return res.status(400).json({ error: 'A senha deve ser uma string válida' });
  }

  const hashedSenha = await bcrypt.hash(senha, 10); 

  try {
    // Inserir dados na tabela do banco de dados
    await db.none('INSERT INTO usuarios (nome, sobrenome, email, senha, isAdmin) VALUES($1, $2, $3, $4, $5)', [nome, sobrenome, email, hashedSenha, isAdmin]);

    res.status(201).json({ message: 'Conta criada com sucesso' });
  } catch (error) {
    console.error('Erro ao criar conta:', error);
    res.status(500).json({ error: 'Erro ao criar conta' });
  }
});

module.exports = router;
