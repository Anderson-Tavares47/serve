const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require('./validateApiKey');

router.put('/:id', validateApiKey, async (req, res) => {
    const { id } = req.params;
    const { categorias, topico, descrição } = req.body;
  
    try {
      console.log(`Atualizando registro na tabela help com ID ${id}`);
      const result = await db.one('UPDATE help SET data = $1 WHERE id = $2 RETURNING *', [{ categorias, topico, descrição }, id]);
      res.json(result);
    } catch (error) {
      console.error('Erro ao atualizar registro na tabela help:', error);
      res.status(500).send('Erro Interno do Servidor');
    }
  });

  module.exports = router;