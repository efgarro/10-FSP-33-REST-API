const mongoClient = require("../Config/mongoClient");
const User = mongoClient.models.User;
const { pgClient } = require("../Config/postgresClient");
const { pgClientLHost } = require("../Config/postgresClientLHost");
const { generatePassword } = require("../lib/utils");

const getUsersPG = async (req, res) => {
  const response = await pgClient.query("SELECT * FROM scr_users LIMIT 5");
  console.log(response.rows);
  res.send(response.rows);
};

const getCountriesPG = async (req, res) => {
  const response = await pgClientLHost.query("SELECT * FROM scr_countries LIMIT 4");
  console.log(response.rows);
  res.send(response.rows);
};

const getUsersPGLHost = async (req, res) => {
  const response = await pgClientLHost.query("SELECT * FROM scr_users LIMIT 5");
  console.log(response.rows);
  res.send(response.rows);
};
const getCountriesPGLHost = async (req, res) => {
  const response = await pgClientLHost.query("SELECT * FROM scr_countries LIMIT 4");
  console.log(response.rows);
  res.send(response.rows);
};

const newUserPGLHost = async (req, res) => {
  const { email, hash, salt, user_role_id, country_id, is_active, first_name, last_name, image } = req.body
  const response = await pgClientLHost.query(
    "INSERT INTO scr_users (user_id, email, hash, salt, user_role_id, country_id, is_active, first_name, last_name, image) VALUES (uuid_time_nextval(), $1, $2, $3, $4, $5, $6, $7, $8, $9)",
    [
      email,
      hash,
      salt,
      user_role_id,
      country_id,
      is_active,
      first_name,
      last_name,
      image,
    ]
  );
  console.log(response);
  res.json(response.rows);
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

module.exports = { registerUser, getUsersPG,getCountriesPG, newUserPGLHost, getUsersPGLHost, getCountriesPGLHost};
