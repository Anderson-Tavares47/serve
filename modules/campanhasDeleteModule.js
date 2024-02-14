const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

// Delete a campaign by ID
router.delete('/:id', validateApiKey, async (req, res) => {
  const { id } = req.params;

  try {
    await db.none('DELETE FROM campanhas WHERE id = $1', [id]);
    res.json({ message: 'Campaign deleted successfully.' });
  } catch (error) {
    console.error('Error deleting campaign:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
