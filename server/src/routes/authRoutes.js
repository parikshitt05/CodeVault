const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/authController");
const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidators");
const validateRequest = require("../middleware/validateRequest");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerValidator, validateRequest, registerUser);
router.post("/login", loginValidator, validateRequest, loginUser);
router.get("/me", protect, getMe);

module.exports = router;