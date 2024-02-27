const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require('./validateApiKey');

router.post("/", validateApiKey, async (req, res) => {
  const { name } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO tags (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao adicionar tag:", error);
    res.status(500).send("Erro Interno do Servidor");
  }
});

module.exports = router;
