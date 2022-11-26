// const { Client } = require("pg");

// const pgClient = new Client({
//   host: "soy-crc-db-server.postgres.database.azure.com",
//   port: 5432,
//   database: "crc-store",
//   user: "efgarro",
//   password: "Due427ga",
//   ssl: true,
// });

// pgClient.connect();

// serverApp.get("/users", async (req, res) => {
//   const response = await pgClient.query("SELECT * FROM crc_users LIMIT 5");
//   console.log(response.rows);
//   res.send("Connected to DBase");
// });

// module.exports = { pgClient };


const mongoose = require("mongoose");
require("dotenv").config();

const mongoServerURI = process.env.MONGO_URI;

const mongoClient = mongoose.createConnection(mongoServerURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
  email: String,
  hash: String,
  salt: String,
  admin: Boolean,
});

const User = mongoClient.model("User", UserSchema);

// Expose the mongoClient
module.exports = mongoClient;
