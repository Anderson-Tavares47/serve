const express = require('express');
const multer = require('multer');
const db = require('../db'); 

const router = express.Router();

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

router.post('/', upload.single('foto'), async (req, res) => {
  try {
    const { nome, sobrenome, cpf, telefone, cargo, nivelAcesso, email } = req.body;

    const foto = req.file ? req.file.buffer : null;

    const result = await db.one(
      'INSERT INTO adms (foto, nome, sobrenome, cpf, telefone, cargo, nivelAcesso, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [foto, nome, sobrenome, cpf, telefone, cargo, nivelAcesso, email]
    );

    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating a new admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
