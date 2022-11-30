const mongoClient = require("../Config/mongoClient");
const User = mongoClient.models.User;
const { pgClient } = require("../Config/postgresClient");
const { pgClientLHost } = require("../Config/postgresClientLHost");
const { generatePassword } = require("../lib/utils");

const getUsersPG = async (req, res) => {
  const response = await pgClient.query("SELECT * FROM crc_users LIMIT 5");
  console.log(response.rows);
  res.send(response.rows);
};

const getUsersPGLHost = async (req, res) => {
  const response = await pgClientLHost.query("SELECT * FROM scr_users LIMIT 5");
  console.log(response.rows);
  res.send(response.rows);
};

const registerUser = (req, res, next) => {
  const saltHash = generatePassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    email: req.body.email,
    hash: hash,
    salt: salt,
  });

  try {
    newUser.save().then((user) => {
      next();
    });
  } catch (err) {
    res.json({ success: false, msg: err });
  }
};

module.exports = { registerUser, getUsersPG, getUsersPGLHost };
