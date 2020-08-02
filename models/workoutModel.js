const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exercise = new Schema({
  type: {
    type: String,
    trim: true,
    required: "String is Required"
  },
  name: {
    type: String,
    trim: true,
    required: "String is Required"
  },
  duration: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  sets: {
    type: Number,
    required: true
  },
  distance: {
    type: Number,
    required: true
  }
});

const workout = new Schema({
  day: {
    type: Date,
    require: true,
    default: new Date().getTime()
  },
  exercises: [exercise]
});

const Workout = mongoose.model("Workout", workout);
module.exports = Workout;
