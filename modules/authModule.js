const express = require('express');
const speakeasy = require('speakeasy');
const validateApiKey = require('./validateApiKey');
const db = require('../db');

const router = express.Router();

async function salvarSegredo(segredo, userId) {
  try {
    const query = 'UPDATE usuarios SET segredo = $1 WHERE id = $2';
    await db.query(query, [JSON.stringify(segredo), userId]);
    console.log(segredo);
  } catch (error) {
    throw error;
  }
}

function gerarSegredo() {
  const segredo = speakeasy.generateSecret({
    length: 20
  });

  console.log(segredo);
  console.log('Acesse este link e escaneie o QR Code com o Google Authenticator:\n%s', segredo.otpauth_url);

  return segredo;
}

router.get("/:idUsuario", validateApiKey, async (req, res) => {
  try {
    const segredo = gerarSegredo();
    const userId = req.params.idUsuario;
    await salvarSegredo(segredo, userId);
    res.status(200).json({ segredo });
  } catch (error) {
    console.error("Erro ao gerar e salvar o segredo:", error);
    res.status(500).json({ error: "Erro ao gerar e salvar o segredo" });
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
