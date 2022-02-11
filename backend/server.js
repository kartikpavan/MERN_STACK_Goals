const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config(); //! allow us .env file with variables in it.
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();

//mongodb connection from congif file
const connectDb = require("./config/db");

connectDb();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Served on ${PORT}`);
});
