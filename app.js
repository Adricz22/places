const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("build"));

app.use("/api/places", placesRoutes); // => /api/places...
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const port = process.env.PORT || 5000;

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.tf5xv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port, console.log(`Server listening on port ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });
