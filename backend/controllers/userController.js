// if we do not want to use try / catch error handler , there is a express async handler npm package
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @Desc      Register new user
// @route     POST  /api/users
// @access    Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  //!check if user exists
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //!Hash Password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //! Create User
  const user = await new User({ name, email, password: hashedPassword });
  await user.save();
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user Data");
  }
});

// @Desc      Authenticate user
// @route     POST  /api/users/login
// @access    Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //! check for User email
  const user = await User.findOne({ email });
  //! Check user password
  if (!email || !password) {
    res.status(400);
    throw new Error("Missing Credentials");
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials ");
  }
});

// @Desc      get new user
// @route     GET  /api/users
// @access    Private
const getMe = asyncHandler(async (req, res) => {
  res.json({ message: "user Data" });
});

//Generate JWT token
const generateToken = (id) => {
  // first param is payload / data. Second param is the SECRET , Third is the expiry date
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { registerUser, loginUser, getMe };
