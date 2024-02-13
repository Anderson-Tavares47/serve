const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  const { nome } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO tags (nome) VALUES ($1) RETURNING *",
      [nome]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao adicionar tag:", error);
    res.status(500).send("Erro Interno do Servidor");
  }
});

module.exports = router;
