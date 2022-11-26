const { Client } = require("pg");

const pgClient = new Client({
  host: "soy-crc-db-server.postgres.database.azure.com",
  port: 5432,
  database: "crc-store",
  user: "efgarro",
  password: "Due427ga",
  ssl: true,
});

pgClient.connect();

serverApp.get("/users", async (req, res) => {
  const response = await pgClient.query("SELECT * FROM crc_users LIMIT 5");
  console.log(response.rows);
  res.send("Connected to DBase");
});

module.exports = { pgClient };
