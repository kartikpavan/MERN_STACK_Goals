const express = require("express");
const router = express.Router();
//authMiddleware
const protect = require("../middleware/authMiddleware");

// Controllers import
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

router.get("/", protect, getGoals);

router.post("/", protect, setGoal);

router.put("/:id", protect, updateGoal);

router.delete("/:id", protect, deleteGoal);

module.exports = router;
