const express = require("express");
const { createUser, loginUserControll } = require("../controller/userController");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserControll);

module.exports = router;
