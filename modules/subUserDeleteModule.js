const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require('./validateApiKey');

router.delete('/:id', validateApiKey, async (req, res) => {
    const { id } = req.params;
  
    try {
      console.log(`Excluindo subUser com ID ${id}`);
      await db.none('DELETE FROM subUser WHERE id = $1', [id]);
      res.status(204).send(); // 204 No Content
    } catch (error) {
      console.error('Erro ao excluir o subUser:', error);
      res.status(500).send('Erro Interno do Servidor');
    }
  });
  
  module.exports = router;