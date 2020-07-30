const path = require("path");
const Workout = require("../models/workoutModel");
const db = require("../models");

module.exports = function (app) {
  // html routes
  app.get("/exercise", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../public/exercise.html"));
  });

  app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/stats", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../public/stats.html"));
  });

  //  Api routes
  app.get("/api/workouts", (req, res) => {
    //  Get all workouts from the mongodb
    console.log("inside api-routes line 22");
    db.Workout.find()
      .then((workouts) => {
        console.log(workouts, "api-routes 25")
        res.status(200).send(workouts);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  });

  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find()
      .then((workouts) => {
        console.log(workouts, "api-routes 37")
        res.status(200).send(workouts);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  })

  app.post("/api/workouts", (req, res) => {
    // const workoutExists = Object.keys(req.body).length > 0;

    // if (workoutExists) {
    Workout.create(req.body)
      .then((newWorkout) => {
        res.status(202).json(newWorkout);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
    // } else {
    //   res.sendStatus(500);
    // }
    // });
  });

  app.post("/api/workouts/:id", (req, res) => {
    const workoutData = JSON.parse(req.body);
  });
};
