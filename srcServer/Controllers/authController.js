const mongoClient = require("../Config/mongoClient");
const User = mongoClient.models.User;
// const { generatePassword, issueJWT } = require("../lib/utils");

// const getUsers = async (req, res) => {
//   const response = await client.query("SELECT * FROM crc_users LIMIT 5");
//   console.log(response.rows);
//   res.send(response.rows);
// };

// module.exports = {
//   getUsers,
// };

// const loginUser = (req, res, next) => {
//   User.findOne({ email: req.body.email })
//     .then((user) => {
//       if (!user) {
//         return res
//           .status(401)
//           .json({ success: false, msg: "could not find user" });
//       }

//       // Function defined at bottom of app.js
//       const isValid = validPassword(req.body.password, user.hash, user.salt);

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
// };

const registerUser = (req, res, next) => {
  const saltHash = generatePassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    email: req.body.email,
    hash: hash,
    salt: salt,
  });

  try {
    newUser.save().then((user) => {
      next();
    });
  } catch (err) {
    res.json({ success: false, msg: err });
  }
};

module.exports = { registerUser };
