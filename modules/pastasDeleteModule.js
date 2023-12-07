// Importe o módulo 'express' e 'pg-promise'
const express = require('express');
const db = require('../db');
const router = express.Router();

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.none('DELETE FROM pastas WHERE id = $1', [id]);
    res.json({ message: 'Folder deleted successfully.' });
  } catch (error) {
    console.error('Error deleting folder:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
