const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require('./validateApiKey');

router.put('/:id', validateApiKey, async (req, res) => {
    const { id } = req.params;
    const { nome, sobrenome, email, senha, isAdmin, ...opcional } = req.body;
  
    try {
      console.log(`Atualizando usuário com ID ${id}`);
      const columns = Object.keys(opcional).map((key, index) => `${key} = $${index + 6}`).join(', ');
      const values = Object.values(opcional);
      const query = `UPDATE usuarios SET nome = $1, sobrenome = $2, email = $3, hashedsenha = $4, isAdmin = $5, ${columns} WHERE id = $${values.length + 6} RETURNING *`;
      const result = await db.one(query, [nome, sobrenome, email, senha, isAdmin, ...values, id]);
      res.json(result);
    } catch (error) {
      console.error('Erro ao atualizar usuário por ID:', error);
      res.status(500).send('Erro Interno do Servidor');
    }
  });
  
  module.exports = router;

