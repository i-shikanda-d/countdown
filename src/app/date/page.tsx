/**
 * /date page
 * Second step: Select countdown date and time
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepLayout } from '@/components/ui/StepLayout';
import { useCountdownStore } from '@/lib/store';

export default function DatePage() {
  const router = useRouter();
  const { date, time, setDate, setTime, label } = useCountdownStore();
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!date) {
      setError('Please select a date');
      return;
    }

    // Validate that the selected date is in the future
    const selectedDate = new Date(date);
    const now = new Date();
    if (selectedDate <= now) {
      setError('Please select a future date');
      return;
    }

    router.push('/details');
  };

  return (
    <StepLayout
      step={2}
      totalSteps={3}
      title="When is it happening?"
      previousHref="/start"
    >
      <div className="space-y-6">
        {/* Display selected label */}
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-slate-600">Counting down to:</p>
          <p className="text-lg font-semibold text-blue-900">{label}</p>
        </div>

        {/* Date picker */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            📅 Date (required)
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setError('');
            }}
            className="text-black w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Time picker */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            🕐 Time (optional)
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="text-black w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <p className="text-xs text-slate-600 mt-1">
            Leave blank to count down to midnight
          </p>
        </div>

        {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}
      </div>

      <button
        onClick={handleNext}
        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        Next →
      </button>
    </StepLayout>
  );
}
