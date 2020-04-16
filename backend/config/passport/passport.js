const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const db = require("../../models");
const bcrypt = require("bcryptjs");

const BCRYPT_SALT_ROUND = 12;
let jwtOptions = {
  secretOrKey: "c0D3cAmPF1Ve",
};

passport.use(
  "register",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    (username, password, done) => {
      db.user.findOne({ where: { username } }).then((user) => {
        if (user) {
          console.log("Username already taken.");
          return done(null, false, { message: "Username already taken" });
        } else {
          const salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUND);
          const hashedPassword = bcrypt.hashSync(password, salt);

          db.user
            .create({ username: username, password: hashedPassword })
            .then((user) => {
              console.log("User successfully created.");
              return done(null, user);
            })
            .catch((err) => {
              console.log(err);
              done(err);
            });
        }
      });
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    async (username, password, done) => {
      const user = await db.user.findOne({ where: { username: username } });
      if (!user) {
        console.log("Username not found");
        return done(null, false, { message: "username or password is wrong." });
      }

      bcrypt.compare(password, user.password, function (err, isSuccess) {
        if (err) {
          console.log(err);
          done(err);
        }
        if (!isSuccess) {
          console.log("Password Do not match");
          return done(null, false, {
            message: "username or password is wrong",
          });
        }
        console.log("Login successful.");
        return done(null, user);
      });
    }
  )
);

module.exports = { jwtOptions: jwtOptions };
