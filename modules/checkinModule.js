const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.post("/", validateApiKey, async (req, res) => {
  const { latitude, longitude, timestamp } = req.body;

  try {
    await db.none(
      "INSERT INTO checkin (latitude, longitude, timestamp) VALUES($1, $2, $3)",
      [latitude, longitude, timestamp]
    );

    res.status(201).json({ message: "Check-in registrado com sucesso" });
  } catch (error) {
    console.error("Erro ao registrar check-in:", error);
    res.status(500).json({ error: "Erro ao registrar check-in" });
  }
});

module.exports = router;
