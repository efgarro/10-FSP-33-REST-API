const passport = require("passport");
const fs = require("fs");
const path = require("path");

const { pgClient } = require("../Config/postgresClient");
const passportLocal = require("passport-local");
const passportJWT = require("passport-jwt");
const { validatePassword } = require("../Utils/utils");

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
  pgClient
    .query(
      `SELECT user_id, email, hash, salt FROM scr_users WHERE email = $1`,
      [email]
    )
    .then(({ rows }) => {
      const user = rows[0];
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

const jwtVerifyCB = (payload, done) => {
  pgClient
    .query(
      `SELECT user_id, email, hash, salt FROM scr_users WHERE user_id = $1`,
      [payload.sub]
    )
    .then(({ rows }) => {
      const user = rows[0];
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => done(err, null));
};

passport.use(new JWTStrategy(jwtOptions, jwtVerifyCB));
