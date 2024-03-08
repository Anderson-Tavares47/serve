const pgp = require('pg-promise')();

const db = pgp({
  connectionString: 'postgres://yixmxjjh:146A5tfdyeKyKtGjbBUPxh7ujOaWZFh3@isabelle.db.elephantsql.com/yixmxjjh',
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = db;
