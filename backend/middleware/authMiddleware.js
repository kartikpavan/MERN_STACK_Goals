const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization && //! checking for authorization header
    req.headers.authorization.startsWith("Bearer ") //! making sure it is bearer token
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1]; //! assiging the token to a variable 'token'
      // split will turn it into array //? bearer will be 0th index and token will be 1st index
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //! decoding and veryfing the token
      //get user from Tokern
      req.user = await User.findById(decoded.id).select("-password"); //! getting user from token
      next();
    } catch (error) {
      console.log(error);
      res.status(401); //! 401 means not authorized
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized / No Token found");
  }
});

module.exports = protect;
