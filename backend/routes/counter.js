const express = require("express");
const router = express.Router();
const counterController = require("../controllers/counterController");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }), // Verify JWT ถ้า JWT เป็นของจริงและไม่หมดอายุ ค่อยทำบรรทัดที่ 9 ต่อ ถ้าหมดอายุหรือเป็นของปลอมก็จะส่งกลับเป็น 401 Unauthorized ทันที
  counterController.getCurrentCounter
);

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  counterController.updateCounter
);

module.exports = router;
