const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

// Create a new folder
router.post('/', validateApiKey, async (req, res) => {
  const { name } = req.body;

  try {
    console.log('Creating folder:', name);
    const result = await db.one('INSERT INTO pastas (name) VALUES ($1) RETURNING *', [name]);
    res.json(result);
  } catch (error) {
    console.error('Error creating a new folder:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
