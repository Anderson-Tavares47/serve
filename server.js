const express = require("express");
require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");

const criarContaModule = require("./modules/contaModule");
const login = require("./modules/loginModule");
const usuarios = require("./modules/usuariosModule");
const UserAssas = require("./modules/usuarioAssasModule");
const FaturaAssas = require("./modules/FaturasAssasModule");
const criaPastas = require("./modules/criaPastas");
const getPastas = require("./modules/pastasGetModule");
const campanhas = require("./modules/campanhasModule");
const getCampanhas = require("./modules/campanhasGetModule");
const putPastas = require("./modules/pastasPutModule");
const deletePastas = require("./modules/pastasDeleteModule");
const putCamapanhas = require("./modules/campanhasPutModule");
const deleteCamapanhas = require("./modules/campanhasDeleteModule");
const admin = require("./modules/admModule");
const getAdmin = require("./modules/admGetModule");
const postEduzz = require("./modules/eduzz");
const postHotmart = require("./modules/hotmartModule");

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());

// Use o módulo para a rota /criar-conta
app.use("/criar-conta", criarContaModule);
app.use("/login", login);
app.use("/usuarios", usuarios);
app.use("/assasUser", UserAssas);
app.use("/assasFatura", FaturaAssas);
app.use("/api/pastas", criaPastas);
app.use("/pastas", getPastas);
app.use("/api/campanhas", campanhas);
app.use("/campanhas", getCampanhas);
app.use("/editarPasta", putPastas);
app.use("/deletePasta", deletePastas);
app.use("/editarCampanhas", putCamapanhas);
app.use("/deleteCampanhas", deleteCamapanhas);
app.use("/admin", admin);
app.use("/getAdmin", getAdmin);
app.use("/postEduzz", postEduzz);
app.use("hotmart", postHotmart);

app.listen(port, () => {
  console.log(`Servidor está ouvindo em http://localhost:${port}`);
});
