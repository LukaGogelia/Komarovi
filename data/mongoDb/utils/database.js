const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose
      .connect(process.env.DATABASE_URI, opts)
      .then((mongoose) => {
        console.log("Successfully connected to MongoDB");
        return mongoose;
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = dbConnect;
