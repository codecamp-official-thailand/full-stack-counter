const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const counterRoute = require("./routes/counter");
const cors = require("cors");
const db = require("./models");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/counters", counterRoute);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(8000, () => {
    console.log("Server is running on port แปดพัน");
  });
});
