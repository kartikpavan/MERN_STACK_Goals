// if we do not want to use try / catch error handler , there is a express async handler npm package
const asyncHandler = require("express-async-handler"); //
//mongoose model import
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @Desc      Get goal
// @route     GET  /api/goals
// @access    Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @Desc      Set goal
// @route     POST  /api/goals
// @access    Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

// @Desc      Update goal
// @route     PUT  /api/goals/:id
// @access    Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  const user = await User.findById(req.user.id);

  //check for user
  if (!user) {
    res.status(401); //! 401 code means not authorized
    throw new Error("User Not Authorized");
  }
  //Make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }
  const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateGoal);
});

// @Desc      Delete Goals
// @route     DELETE  /api/goals/:id
// @access    Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  const user = await User.findById(req.user.id);
  //check for user
  if (!user) {
    res.status(401); //! 401 code means not authorized
    throw new Error("User Not Authorized");
  }
  //Make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }
  await goal.remove();
  res.status(200).json({ id: req.params.id, message: "Deleted goal" });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
