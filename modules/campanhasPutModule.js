const express = require('express');
const router = express.Router();
const db = require('../db');

// Update an existing campaign by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const result = await db.one('UPDATE campanhas SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
    res.json(result);
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
