async function initWorkout() {
  const lastWorkout = await API.getLastWorkout();
  console.log("Last workout:", lastWorkout);
  if (lastWorkout) {
    document
      .querySelector("a[href='/exercise?']")
      //  Assign new href to New Workout button
      .setAttribute("href", `/exercise?id=${lastWorkout._id}`);

    //  Assign total time for all exercises of the workout to totDuration
    let totDuration = 0;
    lastWorkout.exercises.forEach((exercise) => {
      totDuration += exercise.duration;
    });

    const workoutSummary = {
      date: formatDate(lastWorkout.day),
      totalDuration: totDuration,
      numExercises: lastWorkout.exercises.length,
      ...tallyExercises(lastWorkout.exercises)
    };
    console.log(workoutSummary, "workoutSummary workout.js line 16")
    renderWorkoutSummary(workoutSummary);
  } else {
    renderNoWorkoutText();
  }
}

function tallyExercises(exercises) {
  console.log(exercises, "expecting a cardio in here");
  const tallied = exercises.reduce((acc, curr) => {
    if (curr.type === "resistance") {
      acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
      acc.totalSets = (acc.totalSets || 0) + curr.sets;
      acc.totalReps = (acc.totalReps || 0) + curr.reps;
    } else if (curr.type === "cardio") {
      console.log(acc, "acc", curr, "curr", "wokout.js" )
      console.log(acc.totalDistance, " acc.totalDistance before");
      acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
      console.log(acc.totalDistance, " acc.totalDistance after");
    }
    return acc;
  }, {});
  //The above empty object is rude.
  return tallied;
}

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return new Date(date).toLocaleDateString(options);
}

function renderWorkoutSummary(summary) {
  console.log(summary, "summary workout.js line 56");
  const container = document.querySelector(".workout-stats");

  const workoutKeyMap = {
    date: "Date",
    totalDuration: "Total Workout Duration",
    numExercises: "Exercises Performed",
    totalWeight: "Total Weight Lifted",
    totalSets: "Total Sets Performed",
    totalReps: "Total Reps Performed",
    totalDistance: "Total Distance Covered"
  };

  Object.keys(summary).forEach((key) => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = workoutKeyMap[key];
    const textNode = document.createTextNode(`: ${summary[key]}`);

    p.appendChild(strong);
    p.appendChild(textNode);

    container.appendChild(p);
  });
}

function renderNoWorkoutText() {
  const container = document.querySelector(".workout-stats");
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "You have not created a workout yet!";

  p.appendChild(strong);
  container.appendChild(p);
}

initWorkout();
