/**
 * MongoDB connection helper using Mongoose
 * Handles connection pooling and reuse
 */

import mongoose, { Connection } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

interface Cached {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

const cached: Cached = { conn: null, promise: null };

export async function connectDB(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error(
      'MONGODB_URI environment variable is not set. Create .env.local with MONGODB_URI=your_mongodb_connection_string'
    );
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
