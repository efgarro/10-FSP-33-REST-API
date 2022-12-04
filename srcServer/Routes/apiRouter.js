const express = require("express");
const passport = require("passport");
const apiRouter = express.Router();

// const usersRouter = require("./authRouter");
// const ideasRouter = require("./ideas");
// const meetingsRouter = require("./meetings");

// apiRouter.use("/users", usersRouter);
// apiRouter.use("/users", (req, res) => {
//   res.send("users");
// });
// apiRouter.use("/ideas", ideasRouter)
// apiRouter.use("/meetings", meetingsRouter);

apiRouter.param("hub", (req, res, next, hubName) => {
  req.hubName = hubName;
  next();
});
apiRouter.param("region", (req, res, next, regionName) => {
  req.regionName = regionName;
  next();
});
apiRouter.param("wfl_id", (req, res, next, id) => {
  req.wfl_id = id;
  next();
});

apiRouter.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.send("/protected by Hellow Bella");
  }
);

apiRouter.get("/:region/:hub/waterfalls/:wfl_id", (req, res, next) => {
  console.log("hewwllw");
  res.send({ region: req.regionName, hub: req.hubName, wfl_id: req.wfl_id });
});

module.exports = apiRouter;
