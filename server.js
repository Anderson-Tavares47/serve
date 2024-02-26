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
const campanhasGetId = require("./modules/campanhasGetIdModule");
const admin = require("./modules/admModule");
const getAdmin = require("./modules/admGetModule");
const postEduzz = require("./modules/eduzzModule");
const postHotmart = require("./modules/hotmartModule");
const postMonetizze = require("./modules/monetizzeModule");
const getLeads = require("./modules/leadsGetModule");
const postLeads = require("./modules/leadsPostModule");
const putLeads = require("./modules/leadsPutModule");
const deleteLeads = require("./modules/leadsDeleteModule");
const getTags = require("./modules/tagsGetModule");
const postTags = require("./modules/tagsPostModule");
const putTags = require("./modules/tagsPutModule");
const deleteTags = require("./modules/tagsDeleteModule");
const validateApiKey = require("./modules/validateApiKey");
const pastasGetId = require("./modules/pastasGetIdModule");
const subUserGet = require("./modules/subUserGetModule");
const subUserPost = require("./modules/subUserPostModule");
const subUserAdminGet = require("./modules/subUserGetIdAdminModule");
const subUserPut = require("./modules/subUserPutModule");
const subUserDelete = require("./modules/subUserDeleteModule");
const helpPost = require("./modules/helpPostModule");

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());

app.use(validateApiKey);

app.use("/criar-conta", criarContaModule);
app.use("/login", login);
app.use("/usuarios", usuarios);
app.use("/assasUser", UserAssas);
app.use("/assasFatura", FaturaAssas);
app.use("/api/pastas", criaPastas);
app.use("/pastas", getPastas);
app.use("/getCampanhas", campanhasGetId);
app.use("/api/campanhas", campanhas);
app.use("/campanhas", getCampanhas);
app.use("/editarPasta", putPastas);
app.use("/deletePasta", deletePastas);
app.use("/editarCampanhas", putCamapanhas);
app.use("/deleteCampanhas", deleteCamapanhas);
app.use("/admin", admin);
app.use("/getAdmin", getAdmin);
app.use("/eduzz", postEduzz);
app.use("/hotmart", postHotmart);
app.use("/monetizze", postMonetizze);
app.use("/getLeads", getLeads);
app.use("/postLeads", postLeads);
app.use("/putLeads", putLeads);
app.use("/deleteLeads", deleteLeads);
app.use("/getTags", getTags);
app.use("/postTags", postTags);
app.use("/putTags", putTags);
app.use("/deleteTags", deleteTags);
app.use("/getPastas", pastasGetId); 
app.use("/getSubUser", subUserGet); 
app.use("/postSubUser", subUserPost); 
app.use("/getSubUsersAll", subUserAdminGet); 
app.use("/putSubUser", subUserPut);
app.use("/deleteSubUser", subUserDelete);
app.use("/postHelp", helpPost);


app.listen(port, () => {
  console.log(`Servidor está ouvindo em http://localhost:${port}`);
});
