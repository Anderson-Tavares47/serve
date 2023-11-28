const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db');

// Substitua as informações do banco de dados com as fornecidas pelo ElephantSQL
// const db = pgp('postgres://yixmxjjh:146A5tfdyeKyKtGjbBUPxh7ujOaWZFh3@isabelle.db.elephantsql.com/yixmxjjh');

router.post('/', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
  }

  try {
    // Buscar usuário com o e-mail fornecido
    const user = await db.oneOrNone('SELECT * FROM usuarios WHERE email = $1', email);

    // Verificar se o usuário existe e a senha está correta
    if (user && await bcrypt.compare(senha, user.senha)) {
      res.status(200).json({ message: 'Login bem-sucedido' });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

module.exports = router;
