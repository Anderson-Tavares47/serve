const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require('./validateApiKey');

router.put('/:id', validateApiKey, async (req, res) => {
  const { id } = req.params; 
  const userData = req.body;

  try {
    console.log(`Atualizando usuário com ID ${id}`);
    
    let query = 'UPDATE usuarios SET ';
    const values = [];
    let index = 1;
    
    for (const key in userData) {
      query += `${key} = $${index}, `;
      values.push(userData[key]);
      index++;
    }
    
    query = query.slice(0, -2);
    
    query += ` WHERE id = $${index} RETURNING *`;
    values.push(id);
    
    const result = await db.one(query, values);
    res.json(result);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).send('Erro Interno do Servidor');
  }
});

module.exports = router;
