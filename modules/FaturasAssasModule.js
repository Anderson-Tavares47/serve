const express = require("express");
const axios = require("axios");
const router = express.Router();
const acess_token = "$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNzAxMDY6OiRhYWNoXzEyMjVlOTU3LTEyYzYtNDZiNS1iMTFhLWVjNDA0MTEwMmZmYQ==";
// Configuração da API do Asaas
console.log(acess_token);

const asaasApiOptions = {
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    access_token: acess_token,
  },
};

// Rota para criar uma nova cobrança
router.post("/payments", async (req, res) => {
  try {
    const response = await axios.post(
      "https://sandbox.asaas.com/api/v3/payments",
      req.body,
      asaasApiOptions
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar cobrança" });
  }
});

// Rota para listar todas as cobranças
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://sandbox.asaas.com/api/v3/payments",
      asaasApiOptions
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar cobranças" });
  }
});

// Rota para buscar cobranças por ID do cliente
router.get("/payments/customer/:id", async (req, res) => {
  const customerId = req.params.id;
  console.log(customerId)
  try {
    const response = await axios.get(
      `https://sandbox.asaas.com/api/v3/payments?customer=${customerId}`,
      asaasApiOptions
    );
    console.log(response)
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erro ao buscar cobranças por ID do cliente" });
  }
});

// Rota para atualizar cobrança por ID
router.put("/payments/:id", async (req, res) => {
  const paymentId = req.params.id;
  try {
    const response = await axios.put(
      `https://sandbox.asaas.com/api/v3/payments/${paymentId}`,
      req.body,
      asaasApiOptions
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar cobrança" });
  }
});

// Rota para remover cobrança por ID
router.delete("/payments/:id", async (req, res) => {
  const paymentId = req.params.id;
  try {
    const response = await axios.delete(
      `https://sandbox.asaas.com/api/v3/payments/${paymentId}`,
      asaasApiOptions
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao remover cobrança" });
  }
});

module.exports = router;
