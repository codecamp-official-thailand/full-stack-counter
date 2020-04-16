const db = require("../models");

const getCurrentCounter = async (req, res) => {
  const counter = await db.counter.findOne({ where: { user_id: req.user.id } });
  res.send(String(counter.current));
};

const updateCounter = async (req, res) => {
  const newCounter = req.body.counter;
  await db.counter.update({ newCounter }, { where: { user_id: req.user.id } });
  res.send(String(counter));
};

module.exports = {
  getCurrentCounter,
  updateCounter,
};
