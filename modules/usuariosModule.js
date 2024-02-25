const express = require("express");
const db = require("../db");
const validateApiKey = require("./validateApiKey");

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

router.get("/isAdmin/:id", validateApiKey, async (req, res) => {
  const userId = parseInt(req.params.id, 10); // Converte o parâmetro id para número

  if (isNaN(userId)) {
    // Se o ID não for um número, retorna um erro
    return res.status(400).json({ error: "ID de usuário inválido" });
  }

  try {
    const query = "SELECT isadmin FROM usuarios WHERE id = $1";
    const user = await db.oneOrNone(query, [userId]);

    if (user) {
      // Se encontrou o usuário, retorna se ele é admin ou não
      res.status(200).json({ isadmin: user.isadmin });
    } else {
      // Se não encontrou o usuário, retorna um erro 404
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao recuperar status de administrador:", error);
    res
      .status(500)
      .json({ error: "Erro ao recuperar status de administrador" });
  }
});
module.exports = router;
