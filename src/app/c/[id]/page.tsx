/**
 * /c/[id] page
 * Shareable countdown page
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <p className="text-slate-600 text-lg">Loading countdown...</p>
      </div>
    );
  }

  if (error || !countdown) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
          <p className="text-red-600 font-semibold mb-4">❌ {error}</p>
          <Link
            href="/start"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Create a new countdown
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <Link
            href="/start"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm mb-4 inline-block"
          >
            ← Create new countdown
          </Link>
          <h1 className="text-4xl font-bold text-slate-900">{countdown.label}</h1>
          <p className="text-slate-600 mt-2">
            {formattedDate}
            {countdown.time && ` at ${countdown.time}`}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Image */}
        {countdown.imageUrl && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-md relative w-full h-96">
            <Image
              src={countdown.imageUrl}
              alt={countdown.label}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        )}

        {/* Timer */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <CountdownTimer targetDate={countdown.date} time={countdown.time} />
        </div>

        {/* Description */}
        {countdown.description && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">About</h2>
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
              {countdown.description}
            </p>
          </div>
        )}

        {/* Share button */}
        <div className="mb-8">
          <ShareButton countdownId={id} label={countdown.label} />
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-slate-200">
          <p className="text-slate-600 text-sm">
            A <span className="font-semibold">Filmoja</span> product
          </p>
        </div>
      </div>
    </div>
  );
}
