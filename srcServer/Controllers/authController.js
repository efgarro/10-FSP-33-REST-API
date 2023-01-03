const { json } = require("express");
const { pgClient } = require("../Config/postgresClient");
const { generatePassword } = require("../Utils/utils");

const registerNewUser = async (req, res, next) => {
  const { first_name, last_name, email, user_role_id, country_id, image_url } =
    req.body;

  const saltHash = generatePassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  try {
    const response = await pgClient.query(
      `INSERT INTO scr_users (user_id, first_name, last_name, email, hash, salt, user_role_id, country_id,  image_url) VALUES (uuid_time_nextval(), $1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        first_name,
        last_name,
        email,
        hash,
        salt,
        user_role_id,
        country_id,
        image_url,
      ]
    );
  } catch (err) {
    res.json({ success: false, msg: err });
  }
  next();
};

const findCountryAndUserRoleIds = async (req, res, next) => {
  const { country_of_origin, user_role } = req.body;
  const country_res = await pgClient.query(
    `SELECT country_id FROM scr_countries WHERE country = $1`,
    [country_of_origin]
  );
  const user_role_res = await pgClient.query(
    `SELECT user_role_id FROM scr_user_roles WHERE user_role = $1`,
    [user_role]
  );
  req.body.country_id = country_res.rows[0].country_id;
  req.body.user_role_id = user_role_res.rows[0].user_role_id;
  next();
};

module.exports = {
  registerNewUser,
  findCountryAndUserRoleIds,
};
