const path = require("path");
const Workout = require("../models/workoutModel");
const db = require("../models");

app.get("/exercise", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../public/exercise.html"));
});

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/stats", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../public/stats.html"));
});