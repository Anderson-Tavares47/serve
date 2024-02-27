const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require('./validateApiKey');

router.delete("/:tagName", validateApiKey, async (req, res) => {
  const tagName = req.params.tagName;

  try {
    const result = await db.query(
      "DELETE FROM tags WHERE name = $1 RETURNING *",
      [tagName]
    );

    if (result) {
      res.json(result);
    } else {
      res.status(404).send("Tag não encontrada");
    }
  } catch (error) {
    console.error("Erro ao excluir tag:", error);
    res.status(500).send("Erro Interno do Servidor");
  }
});

module.exports = router;
