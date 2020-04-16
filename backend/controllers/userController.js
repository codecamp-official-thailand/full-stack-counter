const passportObj = require("../config/passport/passport");
const jwt = require("jsonwebtoken");
const db = require("../models");
const bcrypt = require("bcryptjs");

const BCRYPT_SALT_ROUND = 12;

const register = async (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;

  const user = await db.user.findOne({ where: { username: username } });

  if (user) {
    console.log("Username already taken.");
    res.status(400).send({ message: "Username already taken" });
  } else {
    const salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUND);
    const hashedPassword = bcrypt.hashSync(password, salt);

    createNewUser({ username, hashedPassword, name });

    res.status(200).send({ message: "user created." });
  }
};

const createNewUser = async ({ username, hashedPassword, name }) => {
  await db.user.create(
    {
      username: username,
      password: hashedPassword,
      name: name,
      counter: {
        current: 0,
      },
    },
    {
      include: [db.counter],
    }
  );
};

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await db.user.findOne({ where: { username: username } });

  if (!user) {
    console.log("Username not found");
    res.status(401).send({ message: "username or password is wrong" });
  } else {
    const isSuccess = bcrypt.compareSync(password, user.password);

    if (!isSuccess) {
      console.log("Password Do not match");
      res.status(401).send({ message: "username or password is wrong" });
    } else {
      const payload = {
        id: user.id,
        name: user.name,
      };

      const token = jwt.sign(payload, passportObj.jwtOptions.secretOrKey, {
        expiresIn: 60,
      });

      res.status(200).send({
        token: token,
        message: "User found & logged in",
      });
    }
  }
};

module.exports = {
  register,
  login,
};
