const mongoose = require("mongoose");

const connectionString = "mongodb://127.0.0.1:27017/komarovi";

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
      .connect(connectionString, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  console.log(1);
  return cached.conn;
}

module.exports = dbConnect;
