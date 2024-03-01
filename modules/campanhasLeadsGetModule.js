const express = require('express');
const db = require('../db');
const router = express.Router();
const validateApiKey = require('./validateApiKey');

router.get('/', validateApiKey, async (req, res) => {
  const { userid } = req.query; // Obtenha o userid dos parâmetros de consulta
  console.log(userid)
  
  try {
    // Consulta SQL para obter o total de itens na tabela de campanhas para o userid fornecido
    const resultadoCampanhas = await db.one('SELECT COUNT(*) AS total_campanhas FROM campanhas WHERE userid = $1', [userid]);

    // Consulta SQL para obter o total de itens na tabela de leads para o userid fornecido
    const resultadoLead = await db.one('SELECT COUNT(*) AS total_lead FROM lead WHERE userid = $1', [userid]);

    // Construir o resultado total
    const resultadoTotal = {
      total_campanhas: resultadoCampanhas.total_campanhas,
      total_lead: resultadoLead.total_lead
    };

    console.log(resultadoTotal)
    res.status(200).json(resultadoTotal);
  } catch (error) {
    console.error('Erro ao calcular o total de itens das campanhas e leads:', error);
    res.status(500).json({ error: 'Erro ao calcular o total de itens das campanhas e leads' });
  }
});

module.exports = router;
