const path = require("path");
const Workout = require("../models/workoutModel");
const db = require("../models");

module.exports = function (app) {
  app.get("/exercise", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../public/html/exercise.html"));
  });

  app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../public/html/index.html"));
  });

  app.get("/stats", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../public/html/stats.html"));
  });
};
