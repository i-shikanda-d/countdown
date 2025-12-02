/**
 * Mongoose schema and model for Countdown documents
 */

import mongoose, { Schema, Document } from 'mongoose';
import type { Countdown } from '@/types';

// Omit `_id` from the Countdown type so Mongoose's Document `_id` (ObjectId)
// is authoritative and we avoid a type conflict between string and ObjectId.
interface ICountdown extends Document, Omit<Countdown, '_id'> {}

const CountdownSchema = new Schema<ICountdown>(
  {
    label: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    type: {
      type: String,
      enum: ['Birthday', 'Anniversary', 'Event', 'Holiday', 'Launch', 'Custom'],
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      default: undefined,
    },
    description: {
      type: String,
      maxlength: 1000,
      default: undefined,
    },
    imageUrl: {
      type: String,
      default: undefined,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Use existing model if already compiled, otherwise create new one
export const CountdownModel =
  mongoose.models.Countdown ||
  mongoose.model<ICountdown>('Countdown', CountdownSchema);
