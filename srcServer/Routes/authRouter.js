const express = require("express");
const passport = require("passport");
// const { getUsers } = require("../Controllers/usersController");
const authRouter = express.Router();

const mongoClient = require("../Config/dbClient");
const User = mongoClient.models.User;
const { genPassword, issueJWT } = require("../lib/utils");

// authRouter.get("/", getUsers);

authRouter.get("/", (req, res) => res.send("Hellow Bella!"));

authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res, next) => {
    console.log(req.user);
    console.log(req.isAuthenticated());
    res.send("user authenticated");

    // User.findOne({ email: req.body.email })
    //   .then((user) => {
    //     if (!user) {
    //       return res
    //         .status(401)
    //         .json({ success: false, msg: "could not find user" });
    //     }

    //     // Function defined at bottom of app.js
    //     const isValid = validPassword(
    //       req.body.password,
    //       user.hash,
    //       user.salt
    //     );

    //     if (isValid) {
    //       const tokenObject = issueJWT(user);

    //       res.status(200).json({
    //         success: true,
    //         token: tokenObject.token,
    //         expiresIn: tokenObject.expires,
    //       });
    //     } else {
    //       res
    //         .status(401)
    //         .json({ success: false, msg: "you entered the wrong password" });
    //     }
    //   })
    //   .catch((err) => {
    //     next(err);
    //   });
  }
);
// authRouter.post("/login", function (req, res, next) {
//   User.findOne({ email: req.body.email })
//     .then((user) => {
//       if (!user) {
//         return res
//           .status(401)
//           .json({ success: false, msg: "could not find user" });
//       }

//       // Function defined at bottom of app.js
//       const isValid = validPassword(
//         req.body.password,
//         user.hash,
//         user.salt
//       );

//       if (isValid) {
//         const tokenObject = issueJWT(user);

//         res.status(200).json({
//           success: true,
//           token: tokenObject.token,
//           expiresIn: tokenObject.expires,
//         });
//       } else {
//         res
//           .status(401)
//           .json({ success: false, msg: "you entered the wrong password" });
//       }
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// TODO
authRouter.post("/register", function (req, res, next) {
  console.log(req.body);
  const saltHash = genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    email: req.body.email,
    hash: hash,
    salt: salt,
  });

  try {
    newUser.save().then((user) => {
      const jwt = issueJWT(user);
      res.json({
        success: true,
        user: user,
        token: jwt.token,
        expiresIn: jwt.expires,
      });
    });
  } catch (err) {
    res.json({ success: false, msg: err });
  }
});

module.exports = authRouter;
