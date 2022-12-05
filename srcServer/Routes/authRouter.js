const express = require("express");
const passport = require("passport");
const authRouter = express.Router();
const {
  registerUser,
  getUsers,
  getCountries,
  newUser,
} = require("../Controllers/authController");
const { issueJWT } = require("../lib/utils");

authRouter.param("user_id", (req, res, next, id) => {});

authRouter.get("/", (req, res) => res.send("Hellow Bella!"));

authRouter.get("/always-on", (req, res) => {
  console.log("always on route");
  res.json({ message: "Always on!!!... with timer." });
});

authRouter.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  getUsers
);

authRouter.get(
  "/countries",
  passport.authenticate("jwt", { session: false }),
  getCountries
);

authRouter.post(
  "/register",
  registerUser,
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const jwtObject = issueJWT(req.user);
    res.json({
      success: true,
      user: req.user,
      token: jwtObject.token,
      expiresIn: jwtObject.expires,
      message: "authenticated via .../register",
    });
  }
);

authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res, next) => {
    const jwtObject = issueJWT(req.user);
    res.json({
      success: true,
      user: req.user,
      token: jwtObject.token,
      expiresIn: jwtObject.expires,
      message: "authenticated via .../login",
    });
  }
);

module.exports = authRouter;
