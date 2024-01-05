const express = require("express");
const axios = require("axios");
const router = express.Router();
const acess_token = process.env.ACCESS_TOKEN;
// Configuração da API do Asaas
const asaasApiOptions = {
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    access_token: acess_token,
  },
};

// Rota para criar um novo cliente
router.post("/customers", async (req, res) => {
  try {
    const response = await Axios.post(
      "https://sandbox.asaas.com/api/v3/customers",
      req.body,
      asaasApiOptions
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar cliente" });
  }
});

// Rota para listar todos os clientes
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://sandbox.asaas.com/api/v3/customers",
      asaasApiOptions
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar clientes" });
  }
});

// Rota para buscar cliente por CPF
router.get("/customers/:cpf", async (req, res) => {
  const cpf = req.params.cpf;
  try {
    const response = await axios.get(
      `https://sandbox.asaas.com/api/v3/customers?cpfCnpj=${cpf}`,
      asaasApiOptions
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar cliente por CPF" });
  }
});

// Rota para atualizar cliente por ID
router.put("/customers/:id", async (req, res) => {
  const customerId = req.params.id;
  try {
    const response = await axios.put(
      `https://sandbox.asaas.com/api/v3/customers/${customerId}`,
      req.body,
      asaasApiOptions
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar cliente" });
  }
});

// Rota para remover cliente por ID
router.delete("/customers/:id", async (req, res) => {
  const customerId = req.params.id;
  try {
    const response = await axios.delete(
      `https://sandbox.asaas.com/api/v3/customers/${customerId}`,
      asaasApiOptions
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao remover cliente" });
  }
});
module.exports = router;
