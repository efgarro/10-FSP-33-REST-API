const express = require("express");
const passport = require("passport");
const authRouter = express.Router();
const { registerUser } = require("../Controllers/authController");
const { issueJWT } = require("../lib/utils");

// authRouter.get("/", getUsers);

authRouter.get("/", (req, res) => res.send("Hellow Bella!"));

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

module.exports = authRouter;
