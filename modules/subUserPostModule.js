const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require('./validateApiKey');

router.post('/', validateApiKey, async (req, res) => {
  const { id, idAdmin, nome, sobrenome, cpf, celular, cargo, nivelAcesso, email, foto } = req.body;

  try {
    let query;
    let values;
    if (foto) {
      query = 'INSERT INTO subUser (id, idAdmin, nome, sobrenome, cpf, celular, cargo, nivelAcesso, email, foto) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
      values = [id, idAdmin, nome, sobrenome, cpf, celular, cargo, nivelAcesso, email, foto];
    } else {
      query = 'INSERT INTO subUser (id, idAdmin, nome, sobrenome, cpf, celular, cargo, nivelAcesso, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
      values = [id, idAdmin, nome, sobrenome, cpf, celular, cargo, nivelAcesso, email];
    }

    const result = await db.one(query, values);
    res.json(result);
  } catch (error) {
    console.error('Erro ao criar um novo subUser:', error);
    res.status(500).send('Erro Interno do Servidor');
  }
});

module.exports = router;
