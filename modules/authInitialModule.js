const express = require('express');
const speakeasy = require('speakeasy');
const validateApiKey = require('./validateApiKey');
const db = require('../db');

const router = express.Router();

async function obterSegredoUsuario(idUsuario) {
    try {
        const usuario = await db.one("SELECT * FROM usuarios WHERE id = $1", [idUsuario]);
        return usuario.segredo;
    } catch (error) {
        throw new Error("Erro ao obter o segredo do usuário: " + error.message);
    }
}
  
router.get("/:idUsuario", validateApiKey, async (req, res) => {
  try {
    const idUsuario = req.params.idUsuario;
    console.log(idUsuario);
    const segredo = await obterSegredoUsuario(idUsuario);
    res.status(200).json({ segredo });
  } catch (error) {
    console.error("Erro ao obter o segredo do usuário:", error);
    res.status(500).json({ error: "Erro ao obter o segredo do usuário" });
  }
});

router.post("/verificar-codigo", validateApiKey, (req, res) => {
  try {
    const { codigo, segredo } = req.body;
    const tokenValido = speakeasy.totp.verify({ secret: segredo.ascii, encoding: 'ascii', token: codigo });

    if (tokenValido) {
      res.status(200).json({ mensagem: "Código correto" });
    } else {
      res.status(400).json({ mensagem: "Código incorreto" });
    }
  } catch (error) {
    console.error("Erro ao verificar o código:", error);
    res.status(500).json({ error: "Erro ao verificar o código" });
  }
});

module.exports = router;
