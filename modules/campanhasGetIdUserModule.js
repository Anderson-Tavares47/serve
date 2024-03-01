const express = require('express');
const db = require('../db');
const router = express.Router();
const validateApiKey = require('./validateApiKey');

router.get('/:userid', validateApiKey, async (req, res) => {
  const { userid } = req.params; 

  try {
    const campanhas = await db.manyOrNone('SELECT * FROM campanhas WHERE userid = $1', userid); 

    res.status(200).json(campanhas);
  } catch (error) {
    console.error('Erro ao recuperar as campanhas por userid:', error);
    res.status(500).json({ error: 'Erro ao recuperar as campanhas por userid' });
  }
});

module.exports = router;
