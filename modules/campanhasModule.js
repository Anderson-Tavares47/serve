const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a new campaign for a specific folder
router.post('/pastas/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const result = await db.one('INSERT INTO campanhas (name, pasta_id) VALUES ($1, $2) RETURNING *', [name, id]);
    res.json(result);
  } catch (error) {
    console.error('Error creating a new campaign:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
