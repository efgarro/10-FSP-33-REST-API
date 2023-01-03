const express = require("express");
const passport = require("passport");
const testRouter = express.Router();

const {
  getUsers,
  findIds,
  getUserPG,
} = require("../Controllers/apiController");

testRouter.param("user_id", (req, res, next, id) => {});

testRouter.get("/", (req, res) => res.send("Hellow Bella!"));

testRouter.post("/find-ids", findIds, (req, res) =>
  res.send("Hellow find-ids!")
);

testRouter.get("/always-on", (req, res) => {
  console.log("always on route");
  res.json({ message: "Always on!!!... with timer." });
});

testRouter.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  getUsers
);


testRouter.post(
  "/find-user",
  passport.authenticate("jwt", { session: false }),
  getUserPG
);

module.exports = testRouter;
