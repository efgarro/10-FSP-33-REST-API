const { client } = require("../Config/dbClient");

client.connect();

const getUsers = async (req, res) => {
  const response = await client.query("SELECT * FROM crc_users LIMIT 5");
  console.log(response.rows);
  res.send(response.rows);
};

module.exports = {
  getUsers,
};
