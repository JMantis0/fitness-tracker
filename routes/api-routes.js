const Workout = require("../models/workoutModel");
const db = require("../models");
module.exports = function (app) {
  //  Api routes
  app.get("/api/workouts", (req, res) => {
    //  Get all workouts from the mongodb
    db.Workout.find()
      .then((workouts) => {
        res.status(200).send(workouts);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  });

  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find().limit(7)
      .sort({
        day: -1
      })
      .then((workouts) => {
        console.log(workouts, "line 23 api-routes")
        res.status(200).send(workouts);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  });

  app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
      .then((newWorkout) => {
        res.status(202).json(newWorkout);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  });

  app.put("/api/workouts/:id", (req, res) => {
    const newExercise = req.body;
    db.Workout.updateOne(
      { _id: req.params.id },
      { $push: { exercises: newExercise } }
    )
      .then(() => {
        res.sendStatus(202);
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  });
};
