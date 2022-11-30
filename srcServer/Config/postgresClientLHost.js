const { Client } = require("pg");

const pgClientLHostPassword = process.env.PG_PWD_LH;

const pgClientLHost = new Client({
  host: "localhost:4000",
  port: 5432,
  database: "scr-db-v2022a",
  user: "efgarro",
  password: pgClientLHostPassword,
  ssl: true,
});

pgClientLHost.connect();

module.exports = { pgClientLHost };
