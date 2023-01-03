const { pgClient } = require("../Config/postgresClient");
const { generatePassword } = require("../Utils/utils");

const getCountries = async (req, res) => {
  pgClient
    .query("SELECT * FROM scr_countries")
    .then(({ rows }) => {
      res.json(rows);
    })
    .catch((err) => res.json({ success: false, msg: err }));
};

const getUserRoles = async (req, res) => {
  pgClient
    .query("SELECT * FROM scr_user_roles")
    .then(({ rows }) => {
      res.json(rows);
    })
    .catch((err) => res.json({ success: false, msg: err }));
};

const getUsers = (req, res) => {
  const { limit } = req.query;
  pgClient
    .query(`SELECT * FROM scr_users LIMIT $1`, [limit])
    .then(({ rows }) => {
      res.json(rows);
    })
    .catch((err) => res.json({ success: false, msg: err }));
};
const getUserById = (req, res) => {
  pgClient
    .query(`SELECT * FROM scr_users WHERE user_id = $1`, [req.user_id])
    .then(({ rows }) => {
      res.json(rows);
    })
    .catch((err) => res.json({ success: false, msg: err }));
};

const getRestaurants = (req, res) => {
  const { limit } = req.query;
  pgClient
    .query(`SELECT * FROM scr_restaurants LIMIT $1`, [limit])
    .then(({ rows }) => {
      res.json(rows);
    })
    .catch((err) => res.json({ success: false, msg: err }));
};
const getRestaurantById = (req, res) => {
  pgClient
    .query(`SELECT * FROM scr_restaurants WHERE resta_place_id = $1`, [req.place_id])
    .then(({ rows }) => {
      res.json(rows);
    })
    .catch((err) => res.json({ success: false, msg: err }));
};

const getLodging = (req, res) => {
  const { limit } = req.query;
  pgClient
    .query(`SELECT * FROM scr_lodging LIMIT $1`, [limit])
    .then(({ rows }) => {
      res.json(rows);
    })
    .catch((err) => res.json({ success: false, msg: err }));
};
const getLodgingById = (req, res) => {
  pgClient
    .query(`SELECT * FROM scr_lodging WHERE lodge_place_id = $1`, [req.place_id])
    .then(({ rows }) => {
      res.json(rows);
    })
    .catch((err) => res.json({ success: false, msg: err }));
};

const getWaterfalls = (req, res) => {
  const { limit } = req.query;
  pgClient
    .query(`SELECT * FROM scr_waterfalls LIMIT $1`, [limit])
    .then(({ rows }) => {
      res.json(rows);
    })
    .catch((err) => res.json({ success: false, msg: err }));
};
const getWaterfallById = (req, res) => {
  pgClient
    .query(`SELECT * FROM scr_waterfalls WHERE wfall_place_id = $1`, [req.place_id])
    .then(({ rows }) => {
      res.json(rows);
    })
    .catch((err) => res.json({ success: false, msg: err }));
};

const getHubs = (req, res) => {
  pgClient
    .query(`SELECT * FROM scr_hubs`)
    .then(({ rows }) => {
      res.json(rows);
    })
    .catch((err) => res.json({ success: false, msg: err }));
};

const getSchemaTypes = (req, res) => {
  pgClient
    .query(`SELECT * FROM scr_schema_types`)
    .then(({ rows }) => {
      res.json(rows);
    })
    .catch((err) => res.json({ success: false, msg: err }));
};

const generatePlaceId = async (req, res, next) => {
  try {
    const place_id_res = await pgClient.query(
      `INSERT INTO scr_places (place_id) VALUES (uuid_time_nextval()) RETURNING *`
    );
    req.body.place_id = place_id_res.rows[0].place_id;
    console.log(req.body.place_id);
  } catch (err) {
    res.json({ success: false, msg: err });
  }
  next();
};

const findSchemaTypeAndHubId = async (req, res, next) => {
  const { hub_tag, schema_type_tag } = req.body;
  try {
    const hub_id_res = await pgClient.query(
      `SELECT hub_id FROM scr_hubs WHERE hub_tag = $1`,
      [hub_tag]
    );
    const schema_type_id_res = await pgClient.query(
      `SELECT schema_type_id FROM scr_schema_types WHERE schema_type_tag = $1`,
      [schema_type_tag]
    );
    req.body.hub_id = hub_id_res.rows[0].hub_id;
    req.body.schema_type_id = schema_type_id_res.rows[0].schema_type_id;
  } catch (err) {
    res.json({ success: false, msg: err });
  }
  next();
};

const setHubAndSchemaTypeTags = async (place_id, hub_tag, schema_type_tag) => {
  await pgClient.query(
    `UPDATE scr_places SET hub_tag = $1 WHERE place_id = $2`,
    [hub_tag, place_id]
  );
  await pgClient.query(
    `UPDATE scr_places SET schema_type_tag = $1 WHERE place_id = $2`,
    [schema_type_tag, place_id]
  );
};

const registerNewRestaurant = async (req, res, next) => {
  const {
    place_id,
    hub_id,
    hub_tag,
    schema_type_id,
    schema_type_tag,
    name,
    description,
    telephone,
    email,
    opening_hours,
    price_range,
    url,
    latitude,
    longitude,
  } = req.body;

  try {
    await pgClient.query(
      `INSERT INTO scr_restaurants (resta_place_id, hub_id, schema_type_id, name, description, telephone, email, opening_hours, price_range, url, latitude,  longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [
        place_id,
        hub_id,
        schema_type_id,
        name,
        description,
        telephone,
        email,
        opening_hours,
        price_range,
        url,
        latitude,
        longitude,
      ]
    );
    await setHubAndSchemaTypeTags(place_id, hub_tag, schema_type_tag);
  } catch (err) {
    pgClient
      .query(`DELETE FROM scr_places WHERE place_id IN ($1)`, [place_id])
      .catch((err) => res.json({ success: false, msg: err }));
    res.json({ success: false, msg: err });
  }
  next();
};

const registerNewLodging = async (req, res, next) => {
  const {
    place_id,
    hub_id,
    hub_tag,
    schema_type_id,
    schema_type_tag,
    name,
    description,
    telephone,
    email,
    price_range,
    url,
    latitude,
    longitude,
  } = req.body;

  try {
    await pgClient.query(
      `INSERT INTO scr_lodging (lodge_place_id, hub_id, schema_type_id, name, description, telephone, email, price_range, url, latitude,  longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        place_id,
        hub_id,
        schema_type_id,
        name,
        description,
        telephone,
        email,
        price_range,
        url,
        latitude,
        longitude,
      ]
    );
    setHubAndSchemaTypeTags(place_id, hub_tag, schema_type_tag);
  } catch (err) {
    pgClient
      .query(`DELETE FROM scr_places WHERE place_id IN ($1)`, [place_id])
      .catch((err) => res.json({ success: false, msg: err }));
    res.json({ success: false, msg: err });
  }
  next();
};

const registerNewWaterfall = async (req, res, next) => {
  const {
    place_id,
    hub_id,
    hub_tag,
    schema_type_id,
    schema_type_tag,
    name,
    description,
    latitude,
    longitude,
  } = req.body;

  try {
    const response = await pgClient.query(
      `INSERT INTO scr_waterfalls (wfall_place_id, hub_id, schema_type_id, name, description, latitude,  longitude) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [place_id, hub_id, schema_type_id, name, description, latitude, longitude]
    );
    setHubAndSchemaTypeTags(place_id, hub_tag, schema_type_tag);
  } catch (err) {
    pgClient
      .query(`DELETE FROM scr_places WHERE place_id IN ($1)`, [place_id])
      .catch((err) => res.json({ success: false, msg: err }));
    res.json({ success: false, msg: err });
  }
  next();
};

module.exports = {
  getUserRoles,
  getCountries,
  getUsers,
  getUserById,
  generatePlaceId,
  getHubs,
  getSchemaTypes,
  getRestaurants,
  getRestaurantById,
  getLodging,
  getLodgingById,
  getWaterfalls,
  getWaterfallById,
  findSchemaTypeAndHubId,
  registerNewRestaurant,
  registerNewLodging,
  registerNewWaterfall,
};
