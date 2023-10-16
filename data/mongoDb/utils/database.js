const mongoose = require("mongoose");

// Module-level caching
let cached = { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (mongoose.connection.readyState !== 0) {
    // If we're in any state other than 'disconnected', return the existing connection
    return mongoose.connection;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose
      .connect(process.env.DATABASE_URI, opts)
      .then((mongooseInstance) => {
        console.log("Successfully connected to MongoDB");
        return mongooseInstance;
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
