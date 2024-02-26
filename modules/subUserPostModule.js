const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require('./validateApiKey');

router.post('/', validateApiKey, async (req, res) => {
  const { idAdmin, nome, sobrenome, cpf, celular, cargo, nivelAcesso, email, foto } = req.body;

  try {
    console.log('Criando subUser:', nome);
    const result = await db.one('INSERT INTO subUser (idAdmin, nome, sobrenome, cpf, celular, cargo, nivelAcesso, email, foto) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [idAdmin, nome, sobrenome, cpf, celular, cargo, nivelAcesso, email, foto]);
    res.json(result);
  } catch (error) {
    console.error('Erro ao criar um novo subUser:', error);
    res.status(500).send('Erro Interno do Servidor');
  }
});

module.exports = router;
