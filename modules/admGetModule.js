const express = require("express");
const db = require("../db");
const router = express.Router();
const validateApiKey = require("./validateApiKey");

// Rota para buscar todos os usuários
router.get("/", validateApiKey, async (req, res) => {
  try {
    const usuarios = await db.any("SELECT * FROM adms");
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Erro ao recuperar usuários:", error);
    res.status(500).json({ error: "Erro ao recuperar usuários" });
  }
});

// Rota para buscar um usuário específico pelo ID
router.get("/:id", validateApiKey, async (req, res) => {
  const userId = parseInt(req.params.id); // Garante que o ID seja um número
  if (!userId) {
    return res.status(400).json({ error: "ID de usuário inválido" });
  }

  try {
    const query = "SELECT * FROM adms WHERE id = $1";
    const usuario = await db.oneOrNone(query, [userId]);

    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error(`Erro ao recuperar o usuário com ID ${userId}:`, error);
    res.status(500).json({ error: "Erro ao recuperar usuário" });
  }
});

module.exports = router;
