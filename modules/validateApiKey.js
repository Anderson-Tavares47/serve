const db = require("../db");

const validateApiKey = async (req, res, next) => {
  const apiKey = req.headers['api-key'];

  if (!apiKey) {
    return res.status(401).json({ error: 'API_KEY ausente na solicitação' });
  }

  try {
    const result = await db.oneOrNone('SELECT * FROM api_keys WHERE chave_api = $1', apiKey);

    if (!result) {
      return res.status(401).json({ error: 'API_KEY inválida' });
    }

    next();
  } catch (error) {
    console.error('Erro ao validar a API_KEY:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = validateApiKey;
