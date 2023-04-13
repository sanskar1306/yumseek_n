const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.js");
const {register,login,deleteUser} = require("../controllers/user.controller.js")

router.post("/register",register);
router.post("/login", login);

router.delete("/delete",auth.verifyToken,deleteUser);

module.exports = router;
