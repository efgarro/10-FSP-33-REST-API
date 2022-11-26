const passport = require("passport");
const fs = require("fs");
const path = require("path");
const mongoClient = require("./mongoClient");
const User = mongoClient.models.User;
const passportLocal = require("passport-local");
const passportJWT = require("passport-jwt");
const { validatePassword } = require("../lib/utils");

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const customFields = {
  usernameField: "email",
  password: "password",
};

const localVerifyCB = (email, password, done) => {
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }

      const isValid = validatePassword(password, user.hash, user.salt);

      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
};

passport.use(new LocalStrategy(customFields, localVerifyCB));

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

// TODO
const jwtVerifyCB = (payload, done) => {
  User.findOne({ _id: payload.sub })
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => done(err, null));
};

passport.use(new JWTStrategy(jwtOptions, jwtVerifyCB));
