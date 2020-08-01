const mongo = require("mongodb");
const Workout = require("../models/workoutModel");


module.exports = function (app) {
  //  Api routes
  app.get("/api/workouts", (req, res) => {
    //  Get all workouts from the mongodb
    Workout.find()
      .then((workouts) => {
        res.status(200).send(workouts);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  });

  app.get("/api/workouts/range", (req, res) => {
    Workout.find()
      .then((workouts) => {
        res.status(200).send(workouts);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  });

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

  app.put("/api/workouts/:id", (req, res) => {
    const newExercise = req.body;
    console.log(newExercise);
    // db.Workout.find({ _id: req.params.id })
    //   .then((result) => console.log(result, "53"))
    //   .catch((error) => console.log(error));
    Workout.updateOne(
      { _id: req.params.id },
      { $push: { exercises: newExercise } }
    )
      .then((workout) => {
        res.status(200).json(workout);
      })
      .catch((error) => {
        res.status(404).json(error);
      });
  });
};
