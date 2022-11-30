const { Client } = require("pg");

const pgClientPassword = process.env.PG_PWD;

const pgClient = new Client({
  host: "soy-crc-db-server.postgres.database.azure.com",
  port: 5432,
  database: "crc-store",
  user: "efgarro",
  password: pgClientPassword,
  ssl: true,
});

pgClient.connect();

module.exports = { pgClient };
