// database.js
const pgp = require('pg-promise')();

// Substitua as informações do banco de dados com as fornecidas pelo ElephantSQL
const db = pgp('postgres://yixmxjjh:146A5tfdyeKyKtGjbBUPxh7ujOaWZFh3@isabelle.db.elephantsql.com/yixmxjjh');

module.exports = db;
