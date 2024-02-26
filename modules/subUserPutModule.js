const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require('./validateApiKey');

router.put('/:id', validateApiKey, async (req, res) => {
  const { id } = req.params;
  const { idAdmin, nome, sobrenome, cpf, celular, cargo, nivelAcesso, email, foto } = req.body;

  try {
    console.log(`Atualizando subUser com ID ${id}`);
    const result = await db.one('UPDATE subUser SET idAdmin = $1, nome = $2, sobrenome = $3, cpf = $4, celular = $5, cargo = $6, nivelAcesso = $7, email = $8, foto = $9 WHERE id = $10 RETURNING *', [idAdmin, nome, sobrenome, cpf, celular, cargo, nivelAcesso, email, foto, id]);
    res.json(result);
  } catch (error) {
    console.error('Erro ao atualizar o subUser:', error);
    res.status(500).send('Erro Interno do Servidor');
  }
});

module.exports = router;
