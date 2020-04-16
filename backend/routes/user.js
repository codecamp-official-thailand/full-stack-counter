const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportObj = require("../config/passport/passport");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res, next) => {
  passport.authenticate("register", async (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info) {
      console.log(info);
      res.status(400).send(info.message);
    } else {
      const name = req.body.name;
      await user.update({ name: name });
      res.status(200).send({ message: "user created." });
    }
  })(req, res, next);
});

router.post("/login", (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info) {
      console.log(info);
      res.status.send(info.message);
    } else {
      const superSecretKey = passportObj.jwtOptions.secretOrKey;
      const payload = {
        id: user.id,
        name: user.name,
      };
      const token = jwt.sign(payload, superSecretKey, { expiresIn: 60 });
      res.status(200).send({
        token: token,
        message: "User found & logged in",
      });
    }
  })(req, res, next);
});

module.exports = router;
