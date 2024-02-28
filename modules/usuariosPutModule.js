const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require('./validateApiKey');

router.put('/:id', validateApiKey, async (req, res) => {
    let { id } = req.params; // Captura o ID como string
    id = parseInt(id); // Converte o ID para um número inteiro

    const { nome, sobrenome, email, senha, isAdmin, cargo, ...opcional } = req.body;
  
    try {
      console.log(`Atualizando usuário com ID ${id}`);
      
      // Construindo a parte da consulta SQL para os campos opcionais
      const columns = Object.keys(opcional).map((key, index) => `${key} = $${index + 7}`).join(', ');
      
      // Construindo os valores dos parâmetros da consulta SQL
      const values = Object.values(opcional);
      
      // Corrigindo a consulta SQL para usar "senha" em vez de "hashedsenha"
      const query = `
        UPDATE usuarios 
        SET nome = $1, sobrenome = $2, email = $3, senha = $4, isAdmin = $5, cargo = $6, ${columns} 
        WHERE id = $${Object.keys(opcional).length + 6} 
        RETURNING *
      `;
      
      // Executando a consulta no banco de dados
      const result = await db.one(query, [nome, sobrenome, email, senha, isAdmin, cargo, ...values, id]);
      
      // Retornando o resultado da consulta como resposta
      res.json(result);
    } catch (error) {
      console.error('Erro ao atualizar usuário por ID:', error);
      res.status(500).send('Erro Interno do Servidor');
    }
});

module.exports = router;
