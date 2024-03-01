const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.post("/", validateApiKey, async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios" });
  }

  try {
    const user = await db.oneOrNone(
      "SELECT * FROM usuarios WHERE email = $1",
      email
    );

    if (user && (await bcrypt.compare(senha, user.senha))) {
      const userData = {
        id: user.id,
        nome: user.nome,
        email: user.email,
        dfatores: user.dfatores
      };

      res.status(200).json({
        message: "Login bem-sucedido",
        user: userData,
      });
    } else {
      res.status(401).json({ error: "Credenciais inválidas" });
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
});

module.exports = router;
