/**
 * Home page - Landing page with CTA to start creating countdowns
 */

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <h1 className="text-5xl font-bold text-slate-900 mb-4">
          ⏱️ Timely
        </h1>
        <p className="text-xl text-slate-700 mb-8">
          Create and share beautiful countdowns for your special moments
        </p>
        <Link
          href="/start"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
        >
          Get Started →
        </Link>
        <p className="text-slate-600 mt-12 text-sm">
          A <span className="font-semibold">Filmoja</span> product
        </p>
      </div>
    </div>
  );
}
