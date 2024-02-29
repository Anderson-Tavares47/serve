const express = require('express');
const db = require('../db');
const router = express.Router();
const validateApiKey = require('./validateApiKey');

router.get('/', validateApiKey, async (req, res) => {
  try {
    const resultadoCampanhas = await db.one('SELECT SUM(valor) AS valor_total_campanhas FROM campanhas');

    const resultadoLead = await db.one('SELECT SUM(valor) AS valor_total_lead FROM lead');

    const resultadoTotal = {
      valor_total_campanhas: resultadoCampanhas.valor_total_campanhas,
      valor_total_lead: resultadoLead.valor_total_lead
    };

    res.status(200).json(resultadoTotal);
  } catch (error) {
    console.error('Erro ao calcular o valor total das campanhas e leads:', error);
    res.status(500).json({ error: 'Erro ao calcular o valor total das campanhas e leads' });
  }
});

module.exports = router;
