const express = require('express');
const router = express.Router();
const db = require('../db');
const validateApiKey = require('./validateApiKey');

router.get("/", validateApiKey, async (req, res) => {
  const { userid } = req.query; // Obtenha o userid dos parâmetros de consulta
  
  try {
    const result = await db.query("SELECT * FROM lead WHERE userid = $1", [userid]);
    res.json(result);
  } catch (error) {
    console.error("Erro ao obter leads:", error);
    res.status(500).send("Erro Interno do Servidor");
  }
});

module.exports = router;
