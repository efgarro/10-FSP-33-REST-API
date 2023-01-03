const express = require("express");
const passport = require("passport");
const apiRouter = express.Router();
const {
  getCountries,
  getUserRoles,
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
} = require("../Controllers/apiController");

apiRouter.param("user_id", (req, res, next, user_id) => {
  req.user_id = user_id;
  next();
});

apiRouter.param("place_id", (req, res, next, place_id) => {
  req.place_id = place_id;
  next();
});

apiRouter.get("/", (req, res) => {
  res.send("Hellow Bella");
});

apiRouter.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  getUsers
);

apiRouter.get(
  "/users/:user_id",
  passport.authenticate("jwt", { session: false }),
  getUserById
);

apiRouter.get(
  "/countries",
  passport.authenticate("jwt", { session: false }),
  getCountries
);

apiRouter.get(
  "/user-roles",
  passport.authenticate("jwt", { session: false }),
  getUserRoles
);

apiRouter.get(
  "/hubs",
  passport.authenticate("jwt", { session: false }),
  getHubs
);

apiRouter.get(
  "/schema-types",
  passport.authenticate("jwt", { session: false }),
  getSchemaTypes
);

apiRouter.get(
  "/restaurants",
  passport.authenticate("jwt", { session: false }),
  getRestaurants
);

apiRouter.get(
  "/restaurants/:place_id",
  passport.authenticate("jwt", { session: false }),
  getRestaurantById
);

apiRouter.get(
  "/lodging",
  passport.authenticate("jwt", { session: false }),
  getLodging
);

apiRouter.get(
  "/lodging/:place_id",
  passport.authenticate("jwt", { session: false }),
  getLodgingById
);
apiRouter.get(
  "/waterfalls",
  passport.authenticate("jwt", { session: false }),
  getWaterfalls
);

apiRouter.get(
  "/waterfalls/:place_id",
  passport.authenticate("jwt", { session: false }),
  getWaterfallById
);

apiRouter.post(
  "/register/restaurant",
  generatePlaceId,
  findSchemaTypeAndHubId,
  registerNewRestaurant,
  (req, res, next) => {
    res.send({ success: true, message: "Restaurant Created" });
  }
);

apiRouter.post(
  "/register/lodging",
  generatePlaceId,
  findSchemaTypeAndHubId,
  registerNewLodging,
  (req, res, next) => {
    res.send({ success: true, message: "Lodge Place Created" });
  }
);

apiRouter.post(
  "/register/waterfall",
  generatePlaceId,
  findSchemaTypeAndHubId,
  registerNewWaterfall,
  (req, res, next) => {
    res.send({ success: true, message: "Waterfall Created" });
  }
);

module.exports = apiRouter;
