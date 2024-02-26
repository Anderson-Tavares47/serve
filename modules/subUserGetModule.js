const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require('./validateApiKey');

router.get('/:idAdmin/:id', validateApiKey, async (req, res) => {
  const { idAdmin, id } = req.params;

  try {
    console.log(`Obtendo subUser com idAdmin ${idAdmin} e id ${id}`);
    const result = await db.any('SELECT * FROM subUser WHERE idAdmin = $1 AND id = $2', [idAdmin, id]);
    res.json(result);
  } catch (error) {
    console.error('Erro ao obter subUser por idAdmin e id:', error);
    res.status(500).send('Erro Interno do Servidor');
  }
});

module.exports = router;
