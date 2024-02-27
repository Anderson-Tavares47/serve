const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require('./validateApiKey');

router.put('/:id/dfatores', validateApiKey, async (req, res) => {
    const { id } = req.params;
    const { dfatores } = req.body;
  
    try {
      console.log(`Atualizando campo dfatores na tabela usuarios para o usuário com ID ${id}`);
      const result = await db.result('UPDATE usuarios SET dfatores = $1 WHERE id = $2', [dfatores, id]);
      res.json({ message: `Campo dfatores atualizado para ${dfatores ? 'true' : 'false'} para o usuário com ID ${id}` });
    } catch (error) {
      console.error('Erro ao atualizar campo dfatores na tabela usuarios:', error);
      res.status(500).send('Erro Interno do Servidor');
    }
});

module.exports = router;
