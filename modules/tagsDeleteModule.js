const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require('./validateApiKey');

router.delete("/:id", validateApiKey, async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.query(
      "DELETE FROM tags WHERE id = $1 RETURNING *",
      [id]
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
