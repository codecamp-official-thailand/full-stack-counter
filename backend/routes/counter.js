const express = require("express");
const router = express.Router();
const counterController = require("../controllers/counterController");

router.get("/", counterController.getCurrentCounter);

router.put("/", counterController.updateCounter);

module.exports = router;
