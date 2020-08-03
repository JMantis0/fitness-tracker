const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

const apiRoutes = require("./routes/api-routes");
const htmlRoutes = require("./routes/html-routes");

const app = express();
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true
});

apiRoutes(app);
htmlRoutes(app);

app.listen(PORT, () => {
  console.log(`Workout App running on port ${PORT}`);
});
