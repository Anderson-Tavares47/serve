const pgp = require('pg-promise')();

const db = pgp({
  connectionString: 'postgres://default:tc69oSAOvPFH@ep-red-wildflower-a4b5n1jo.us-east-1.aws.neon.tech:5432/verceldb',
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = db;
