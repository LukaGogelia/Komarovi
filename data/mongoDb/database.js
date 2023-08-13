const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(`Failed to connect: ${err}`);
});
