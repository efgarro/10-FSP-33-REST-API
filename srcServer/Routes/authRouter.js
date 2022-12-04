const express = require("express");
const passport = require("passport");
const authRouter = express.Router();
const { registerUser, getUsersPG, getCountriesPG, newUserPGLHost, getUsersPGLHost, getCountriesPGLHost } = require("../Controllers/authController");
const { issueJWT } = require("../lib/utils");

authRouter.param("user_id", (req, res, next, id) => {

})

authRouter.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  getUsersPG
);
authRouter.get(
  "/countries-az",
  passport.authenticate("jwt", { session: false }),
  getCountriesPG
);
authRouter.post(
  "/newuser-lhost",
  newUserPGLHost
);
authRouter.get(
  "/getusers-lhost",
  getUsersPGLHost
);
authRouter.get(
  "/countries-lhost",
  passport.authenticate("jwt", { session: false }),
  getCountriesPGLHost
);

authRouter.get(
  "/",
  (req, res) => res.send("Hellow Bella!")
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
