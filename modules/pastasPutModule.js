const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

// Update an existing folder by ID
router.put('/:id', validateApiKey, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const result = await db.one('UPDATE pastas SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
    res.json(result);
  } catch (error) {
    console.error('Error updating folder:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
