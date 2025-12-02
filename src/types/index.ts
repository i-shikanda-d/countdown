/**
 * Core type definitions for the Timely countdown app
 */

export type CountdownType = 'Birthday' | 'Anniversary' | 'Event' | 'Holiday' | 'Launch' | 'Custom';

export interface Countdown {
  _id: string;
  label: string;
  type: CountdownType;
  date: string; // ISO date string
  time?: string; // HH:mm format
  description?: string;
  imageUrl?: string; // relative path like /uploads/abc123.jpg
  createdAt: Date;
}

export interface CreateCountdownRequest {
  label: string;
  type: CountdownType;
  date: string;
  time?: string;
  description?: string;
  // image is sent as FormData, not JSON
}

export interface CreateCountdownResponse {
  _id: string;
  message: string;
}

export interface CountdownResponse {
  data: Countdown | null;
  error?: string;
}

// Form state for multi-step form
export interface FormState {
  label: string;
  type: CountdownType | '';
  date: string;
  time: string;
  description: string;
  imageFile: File | null;
}
