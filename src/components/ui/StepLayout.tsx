/**
 * StepLayout component
 * Wraps multi-step form pages with consistent styling and navigation
 */

'use client';

import Link from 'next/link';

interface StepLayoutProps {
  children: React.ReactNode;
  step: number;
  totalSteps: number;
  title: string;
  previousHref?: string;
}

export function StepLayout({
  children,
  step,
  totalSteps,
  title,
  previousHref,
}: StepLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{title}</h1>
            <span className="text-sm text-slate-600 dark:text-slate-300">
              Step {step} of {totalSteps}
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md dark:shadow-none p-8 mb-6 text-slate-900 dark:text-slate-50">
          {children}
        </div>

        {/* Navigation */}
        {previousHref && (
          <div className="flex justify-start">
            <Link
              href={previousHref}
              className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"
            >
              ← Back
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
