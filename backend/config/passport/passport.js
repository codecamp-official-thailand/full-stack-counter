const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt; // Extract JWT ทำหน้าที่เหมือน jwt.io
const db = require("../../models");
const bcrypt = require("bcryptjs");

const BCRYPT_SALT_ROUND = 12;
let jwtOptions = {
  secretOrKey: "c0D3cAmPF1Ve",
};

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtOptions.secretOrKey,
};

passport.use(
  "jwt",
  new JWTStrategy(opts, async (payload, done) => {
    const user = await db.user.findOne({ where: { id: payload.id } });
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
);

module.exports = { jwtOptions: jwtOptions };
