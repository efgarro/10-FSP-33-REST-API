const { Client } = require("pg");

const pgClientPassword = process.env.PG_PWD;

const pgClient = new Client({
  host: "soy-crc-db-server.postgres.database.azure.com",
  port: 5432,
  database: "scr-db-v2022b",
  user: "efgarro",
  password: pgClientPassword,
  ssl: true,
});

pgClient.connect();

module.exports = { pgClient };
