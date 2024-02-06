const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Adicione esta linha
const sgMail = require("@sendgrid/mail");

const router = express.Router();
const db = require("../db");

sgMail.setApiKey('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');

router.post("/", async (req, res) => {
  const { nome, sobrenome, email, senha, isAdmin } = req.body;

  if (!senha || typeof senha !== "string") {
    return res.status(400).json({ error: "A senha deve ser uma string válida" });
  }

  const hashedSenha = await bcrypt.hash(senha, 10);

  try {
    await db.none(
      "INSERT INTO usuarios (nome, sobrenome, email, senha, isAdmin) VALUES($1, $2, $3, $4, $5)",
      [nome, sobrenome, email, hashedSenha, isAdmin]
    );

    const token = jwt.sign({ email }, 'tpfTech_', { expiresIn: "1d" });

    const msg = {
      to: email,
      from: "tpftech23@gmail.com",
      subject: "Verificação de Conta",
      text: `Use este link para verificar sua conta: http://seu-app.com/verificar?token=${token}`,
      html: `Use este <a href="http://seu-app.com/verificar?token=${token}">link</a> para verificar sua conta.`,
    };

    // Envio do e-mail
    await sgMail.send(msg);

    res.status(201).json({ message: "Conta criada com sucesso. Um e-mail de verificação foi enviado." });
  } catch (error) {
    console.error("Erro ao criar conta:", error);
    res.status(500).json({ error: "Erro ao criar conta" });
  }
});

module.exports = router;
