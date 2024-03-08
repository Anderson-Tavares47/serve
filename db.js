// database.js
const pgp = require('pg-promise')();

// Substitua as informações do banco de dados com as fornecidas pelo ElephantSQL
const db = pgp('postgres://default:tc69oSAOvPFH@ep-red-wildflower-a4b5n1jo.us-east-1.aws.neon.tech:5432/verceldb');


module.exports = db;
