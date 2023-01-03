const express = require("express");
const passport = require("passport");
const authRouter = express.Router();
const { issueJWT } = require("../Utils/utils");

const { registerNewUser, findCountryAndUserRoleIds } = require("../Controllers/authController");

authRouter.post(
  "/register/user",
  findCountryAndUserRoleIds,
  registerNewUser,
  passport.authenticate("local", { session: false }),
  (req, res) => {
    res.json({
      success: true,
      user: req.user,
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
