/**
 * /c/[id] page
 * Shareable countdown page - Improved UI/UX
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { CountdownTimer } from '@/components/ui/CountdownTimer';
import { ShareButton } from '@/components/ui/ShareButton';
import type { Countdown } from '@/types';

export default function CountdownPage() {
  const params = useParams();
  const id = params.id as string;
  const [countdown, setCountdown] = useState<Countdown | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCountdown = async () => {
      try {
        const response = await fetch(`/api/countdown/${id}`);
        if (!response.ok) {
          throw new Error('Countdown not found');
        }
        const data = await response.json();
        setCountdown(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load countdown');
      } finally {
        setLoading(false);
      }
    };

    fetchCountdown();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[color:var(--bg)] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[color:var(--accent)] border-t-transparent mb-4"></div>
          <p className="text-[color:var(--muted)] text-lg font-medium">Loading countdown...</p>
        </div>
      </div>
    );
  }

  if (error || !countdown) {
    return (
      <div className="min-h-screen bg-[color:var(--bg)] flex items-center justify-center p-4">
        <div className="bg-[color:var(--surface)] rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-xl sm:text-2xl font-bold text-[color:var(--text)] mb-2">
            Countdown Not Found
          </h2>
          <p className="text-[color:var(--muted)] mb-6">{error}</p>
          <Link
            href="/start"
            className="inline-block bg-[color:var(--accent)] hover:opacity-95 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Create New Countdown
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(countdown.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[color:var(--bg)]">
      {/* Header */}
      <div className="bg-[color:var(--surface)]/80 backdrop-blur-sm shadow-sm border-b border-[color:var(--muted)] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <Link
            href="/start"
            className="text-[color:var(--accent)] hover:opacity-90 font-medium text-sm sm:text-base mb-3 sm:mb-4 inline-flex items-center gap-2 transition-colors"
          >
            <span>←</span>
            <span className="hidden sm:inline">Create new countdown</span>
            <span className="sm:hidden">New countdown</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[color:var(--text)] break-words">
            {countdown.label}
          </h1>
          <p className="text-[color:var(--muted)] mt-2 text-sm sm:text-base">
            {formattedDate}
            {countdown.time && (
              <>
                <span className="hidden sm:inline"> at </span>
                <span className="sm:hidden"> • </span>
                {countdown.time}
              </>
            )}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Image */}
        {countdown.imageUrl && (
          <div className="mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg relative w-full h-48 sm:h-64 md:h-80 lg:h-96">
            <Image
              src={countdown.imageUrl}
              alt={countdown.label}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
              priority
            />
          </div>
        )}

        {/* Timer */}
        <div className="bg-[color:var(--surface)] rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 mb-6 sm:mb-8">
          <CountdownTimer targetDate={countdown.date} time={countdown.time} />
        </div> 

        {/* Description */}
        {countdown.description && (
          <div className="bg-[color:var(--surface)] rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-[color:var(--text)] mb-3 sm:mb-4">
              About This Event
            </h2>
            <p className="text-[color:var(--muted)] text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
              {countdown.description}
            </p>
          </div>
        )}

        {/* Share button */}
        <div className="mb-6 sm:mb-8">
          <ShareButton countdownId={id} label={countdown.label} />
        </div>

        {/* Footer */}
        <div className="text-center py-6 sm:py-8 border-t border-[color:var(--muted)]">
          <p className="text-[color:var(--muted)] text-xs sm:text-sm">
            Made with ❤️ by <span className="font-semibold text-[color:var(--text)]">Filmoja</span>
          </p>
        </div>
      </div>
    </div>
  );
}