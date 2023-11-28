const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const criarContaModule = require('./modules/contaModule');
const login = require('./modules/loginModule')
const usuarios = require('./modules/usuariosModule')

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());

// Use o módulo para a rota /criar-conta
app.use('/criar-conta', criarContaModule);
app.use('/login', login);
app.use('/usuarios', usuarios)

app.listen(port, () => {
  console.log(`Servidor está ouvindo em http://localhost:${port}`);
});
