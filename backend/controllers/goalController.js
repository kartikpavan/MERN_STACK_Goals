// if we do not want to use try / catch error handler , there is a express async handler npm package
const asyncHandler = require("express-async-handler"); //

// @Desc      Get goal
// @route     GET  /api/goals
// @access    Private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Create goal" });
});

// @Desc      Set goal
// @route     POST  /api/goals
// @access    Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add text field");
  }
  console.log(req.body);
  res.status(200).json({ message: "Create goal" });
});

// @Desc      Update goal
// @route     PUT  /api/goals/:id
// @access    Private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` });
});

// @Desc      Delete Goals
// @route     DELETE  /api/goals/:id
// @access    Private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
