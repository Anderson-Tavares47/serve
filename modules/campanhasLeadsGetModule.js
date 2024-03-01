const express = require('express');
const db = require('../db');
const router = express.Router();
const validateApiKey = require('./validateApiKey');

router.get('/:userid', validateApiKey, async (req, res) => {
  const { userid } = req.params; // Obtenha o userid dos parâmetros da rota
  
  try {
    const resultadoCampanhas = await db.one('SELECT COUNT(*) AS total_campanhas FROM campanhas WHERE userid = $1', [userid]);

    const resultadoLead = await db.one('SELECT COUNT(*) AS total_lead FROM lead WHERE userid = $1', [userid]);

    const resultadoTotal = {
      total_campanhas: resultadoCampanhas.total_campanhas,
      total_lead: resultadoLead.total_lead
    };

    res.status(200).json(resultadoTotal);
  } catch (error) {
    console.error('Erro ao calcular o total de itens das campanhas e leads:', error);
    res.status(500).json({ error: 'Erro ao calcular o total de itens das campanhas e leads' });
  }
});

module.exports = router;
