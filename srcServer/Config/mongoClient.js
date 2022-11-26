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
});

const User = mongoClient.model("User", UserSchema);

module.exports = mongoClient;
