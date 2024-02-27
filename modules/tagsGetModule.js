const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require('./validateApiKey');

// Rota para obter todas as tags
router.get("/", validateApiKey, async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tags");
    res.json(result);
  } catch (error) {
    console.error("Erro ao obter tags:", error);
    res.status(500).send("Erro Interno do Servidor");
  }
});

module.exports = router;
