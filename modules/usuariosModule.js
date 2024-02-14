const express = require("express");
const db = require("../db");
const validateApiKey = require('./validateApiKey');

const router = express.Router();

router.get("/", validateApiKey, async (req, res) => {
  try {
   
    const usuarios = await db.any("SELECT * FROM usuarios");

    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Erro ao recuperar usuários:", error);
    res.status(500).json({ error: "Erro ao recuperar usuários" });
  }
});
module.exports = router;
