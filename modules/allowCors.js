// allowCors.js

// Middleware para adicionar cabeçalhos CORS às respostas do servidor
const allowCors = fn => async (req, res) => {
  // Define os cabeçalhos CORS
  res.setHeader('Access-Control-Allow-Credentials', true); // Permite credenciais nas solicitações CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permite acesso de qualquer origem
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT'); // Métodos HTTP permitidos
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  ); // Cabeçalhos personalizados permitidos

  // Se a solicitação for OPTIONS, responde com status 200 e encerra a resposta
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Chama o próximo middleware na cadeia (fn) e passa os objetos req e res
  return await fn(req, res);
}

// Exporta o middleware allowCors para uso em outras partes do código
module.exports = allowCors;
