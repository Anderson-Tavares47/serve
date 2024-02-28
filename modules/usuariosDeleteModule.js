const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.delete('/:id', validateApiKey, async (req, res) => {
  const userId = req.params.id;

  try {
    const userExists = await db.query('SELECT * FROM usuarios WHERE id = $1', [userId]);

    if (userExists.rows) {
      return res.status(404).send('Usuário não encontrado');
    }
    
    await db.query('DELETE FROM usuarios WHERE id = $1', [userId]);
    res.status(200).send('Usuário excluído com sucesso');
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
