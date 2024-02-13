const express = require('express');
const db = require('../db');
const router = express.Router();
const validateApiKey = require('./validateApiKey');

router.get('/:pasta_id', validateApiKey, async (req, res) => {
  const { pasta_id } = req.params;

  try {
    const campanha = await db.one('SELECT * FROM campanhas WHERE pasta_id = $1', pasta_id);

    res.status(200).json(campanha);
  } catch (error) {
    console.error('Erro ao recuperar a campanha por pasta_id:', error);
    res.status(500).json({ error: 'Erro ao recuperar a campanha por pasta_id' });
  }
});

module.exports = router;
