let counter = 0;

const getCurrentCounter = (req, res) => {
  res.send(String(counter));
};

const updateCounter = (req, res) => {
  const newCounter = req.body.counter;
  counter = newCounter;
  res.send(String(counter));
};

module.exports = {
  getCurrentCounter,
  updateCounter,
};
