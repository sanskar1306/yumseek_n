const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.js");
const {
  getAllMenu,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/menu.controller.js");

router.get("/", getAllMenu);
router.get("/:id", auth.verifyToken, getMenuById);
router.post("/add", auth.verifyToken, createMenu);
router.put("/update/:id", auth.verifyToken, updateMenu);
router.delete("/delete/:id", auth.verifyToken, deleteMenu);

module.exports = router;
