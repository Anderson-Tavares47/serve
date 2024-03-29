const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require('./validateApiKey');

router.post('/', validateApiKey, async (req, res) => {
  const { categorias, topico, descrição } = req.body;

  try {
    console.log('Criando registro na tabela help:', req.body);
    const result = await db.one('INSERT INTO help (data) VALUES ($1) RETURNING *', [{ categorias, topico, descrição }]);
    res.json(result);
  } catch (error) {
    console.error('Erro ao criar um novo registro na tabela help:', error);
    res.status(500).send('Erro Interno do Servidor');
  }
});

module.exports = router;
