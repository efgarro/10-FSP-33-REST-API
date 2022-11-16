const { Client } = require("pg");

const client = new Client({
  host: "soy-crc-db-server.postgres.database.azure.com",
  port: 5432,
  database: "crc-store",
  user: "efgarro",
  password: "Due427ga",
  ssl: true,
});

client.connect();

const getUsers = async (req, res) => {
  const response = await client.query("SELECT * FROM crc_users LIMIT 5");
  console.log(response.rows);
  res.send("users");
};

module.exports = {
  getUsers,
};
