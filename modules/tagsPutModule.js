const express = require("express");
const router = express.Router();
const db = require("../db");

router.put("/:tagName", async (req, res) => {
  const tagName = req.params.tagName;
  const { newTagName } = req.body;

  try {
    const result = await db.query(
      "UPDATE tags SET nome = $1 WHERE nome = $2 RETURNING *",
      [newTagName, tagName]
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("Tag não encontrada");
    }
  } catch (error) {
    console.error("Erro ao atualizar tag:", error);
    res.status(500).send("Erro Interno do Servidor");
  }
});

module.exports = router;
