'use client';

import { useState } from 'react';

interface ShareButtonProps {
  countdownId: string;
  label: string;
}

export function ShareButton({ countdownId, label }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/c/${countdownId}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Countdown: ${label}`,
          text: `Join me in counting down to ${label}!`,
          url: shareUrl,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Share failed:', error);
        }
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Copy failed:', error);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
    >
      {copied ? '✓ Copied to clipboard!' : '📤 Share Countdown'}
    </button>
  );
}
