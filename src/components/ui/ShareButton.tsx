'use client';

import { useState } from 'react';

interface ShareButtonProps {
  countdownId: string;
  label: string;
}

export function ShareButton({ countdownId, label }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/c/${countdownId}`;
  const shareMessage = `Join me in counting down to:\n*${label}*\n \n${shareUrl}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Countdown: ${label}`,
          text: `Join me in counting down to \n*${label}* \n`,
          url: shareUrl,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Share failed:', error);
        }
      }
    } else {
      // Fallback: Copy message with link to clipboard
      try {
        await navigator.clipboard.writeText(shareMessage);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Copy failed:', error);
      }
    }
  };

  return (
    <>
      <button
        onClick={handleShare}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400"
        aria-label={`Share countdown: ${label}`}
        title={`Share countdown: ${label}`}
      >
        {copied ? '✓ Copied!' : '📤 Share Countdown'}
      </button>

      {/* Status for assistive tech */}
      <div role="status" aria-live="polite" className="sr-only">
        {copied ? 'Message and link copied to clipboard' : ''}
      </div>

      {/* Visible confirmation for sighted users */}
      {copied && (
        <p className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">Message and link copied to clipboard</p>
      )}
    </>
  );
}