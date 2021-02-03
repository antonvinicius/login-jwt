const express = require("express");
const router = express.Router();

const auth = require(".././controllers/authController");

router.get("/", auth, (req, res) => {
  if (req.user.admin) {
    res.json({ message: "Admin protected" });
  } else {
    res.json({ message: "Access Denied" });
  }
});

module.exports = router;
