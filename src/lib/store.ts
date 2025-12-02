/**
 * Zustand store for managing multi-step form state
 * Persists countdown creation data across page navigation
 */

import { create } from 'zustand';
import type { FormState, CountdownType } from '@/types';

interface CountdownStore extends FormState {
  setLabel: (label: string) => void;
  setType: (type: CountdownType) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setDescription: (description: string) => void;
  setImageFile: (file: File | null) => void;
  reset: () => void;
}

const initialState: FormState = {
  label: '',
  type: '',
  date: '',
  time: '',
  description: '',
  imageFile: null,
};

export const useCountdownStore = create<CountdownStore>((set) => ({
  ...initialState,

  setLabel: (label) => set({ label }),
  setType: (type) => set({ type }),
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setDescription: (description) => set({ description }),
  setImageFile: (imageFile) => set({ imageFile }),

  reset: () => set(initialState),
}));
