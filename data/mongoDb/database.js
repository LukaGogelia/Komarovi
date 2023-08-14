const mongoose = require("mongoose");

const connectionString = "mongodb://127.0.0.1:27017/koamrovi";

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
