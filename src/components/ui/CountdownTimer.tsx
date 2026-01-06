/**
 * CountdownTimer component
 * Displays live countdown with days, hours, minutes, seconds
 */

'use client';

import { useEffect, useState } from 'react';
import { calculateTimeRemaining } from '@/lib/utils';

interface CountdownTimerProps {
  targetDate: string;
  time?: string;
}

export function CountdownTimer({ targetDate, time }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  useEffect(() => {
    // Combine date and time if time is provided
    let fullDateTime = targetDate;
    if (time) {
      const date = new Date(targetDate);
      const [hours, minutes] = time.split(':');
      date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
      fullDateTime = date.toISOString();
    }

    // Initial calculation
    setTimeRemaining(calculateTimeRemaining(fullDateTime));

    // Update every second
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(fullDateTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, time]);

  if (timeRemaining.isOver) {
    return (
      <div className="text-center py-8" role="status" aria-live="polite" aria-atomic="true">
        <p className="text-3xl font-bold text-slate-900">The countdown is over!</p>
      </div>
    );
  }

  const statusText = `${timeRemaining.days} days ${timeRemaining.hours} hours ${timeRemaining.minutes} minutes ${timeRemaining.seconds} seconds remaining`;

  return (
    <div role="timer" aria-live="polite" aria-atomic="true" className="grid grid-cols-4 gap-4 py-8">
      <p className="sr-only" aria-live="polite">{statusText}</p>
      {[
        { value: timeRemaining.days, label: 'Days' },
        { value: timeRemaining.hours, label: 'Hours' },
        { value: timeRemaining.minutes, label: 'Minutes' },
        { value: timeRemaining.seconds, label: 'Seconds' },
      ].map((item) => (
        <div
          key={item.label}
          className="bg-[color:var(--surface)] rounded-lg p-4 text-center border border-[color:var(--muted)]"
        >
          <div className="text-3xl font-bold text-[color:var(--accent)]">
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="text-xs text-[color:var(--muted)] mt-1 uppercase tracking-wider">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
