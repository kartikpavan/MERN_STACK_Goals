const express = require("express");
const dotenv = require("dotenv").config(); //! allow us .env filw with variables in it.
const path = require("path");
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Served on ${PORT}`);
});
