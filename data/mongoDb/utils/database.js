// const mongoose = require("mongoose");

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     };

//     cached.promise = mongoose
//       .connect(process.env.DATABASE_URI, opts)
//       .then((mongoose) => {
//         console.log("Successfully connected to MongoDB");
//         return mongoose;
//       })
//       .catch((err) => {
//         console.error("Error connecting to MongoDB:", err);
//         throw err;
//       });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// module.exports = dbConnect;

import mongoose from 'mongoose';

async function dbConnect() {
  // Check if we have a connection to the database or if it's connecting/connecting
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  // Adding event listeners on Mongoose connection for better debug and logging
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected!');
  });
  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    // Consider adding logic to handle the error, such as notifying an admin or retrying the connection.
  });
  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected!');
    // Optional: Add logic to handle the disconnect event, for example, reconnecting to the database.
  });

  // Use new db connection
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection established!');
  } catch (error) {
    console.error(`Database connection error: ${error}`);
    // Consider handling error, maybe retrying connection or alerting admin.
    throw error;  // Re-throwing error if you want to handle it upstream.
  }
}

export default dbConnect;

