const express = require("express");
const passport = require("passport");
const authRouter = express.Router();
const { registerUser, getUsersPG, getUsersPGLHost } = require("../Controllers/authController");
const { issueJWT } = require("../lib/utils");

authRouter.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  getUsersPG
);
authRouter.get(
  "/userslhost",
  getUsersPGLHost
);

authRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => res.send("Authenticated Hellow Bella!")
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
