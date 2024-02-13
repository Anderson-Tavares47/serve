const express = require('express');
const db = require('../db');
const router = express.Router();
const validateApiKey = require('./validateApiKey');

router.get('/:id', validateApiKey, async (req, res) => {
  const { id } = req.params;

  try {
    const campanha = await db.one('SELECT pasta_id FROM campanhas WHERE id = $1', id);

    res.status(200).json(campanha);
  } catch (error) {
    console.error('Erro ao recuperar a campanha por ID:', error);
    res.status(500).json({ error: 'Erro ao recuperar a campanha por ID' });
  }
});

module.exports = router;

