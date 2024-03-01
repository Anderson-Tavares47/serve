const express = require('express');
const speakeasy = require('speakeasy');
const validateApiKey = require('./validateApiKey');

const router = express.Router();

function gerarSegredo() {
  const segredo = speakeasy.generateSecret({
    length: 20
  });

  console.log('Acesse este link e escaneie o QR Code com o Google Authenticator:\n%s', segredo.otpauth_url);

  return segredo;
}

router.get("/", validateApiKey, (req, res) => {
  try {
    const segredo = gerarSegredo();

    res.status(200).json({ segredo: segredo });
  } catch (error) {
    console.error("Erro ao gerar o segredo:", error);
    res.status(500).json({ error: "Erro ao gerar o segredo" });
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
