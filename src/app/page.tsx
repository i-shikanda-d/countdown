import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-200 flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <Image
          src="/images/timely.png"
          alt="Countdown Hero"
          width={300}
          height={300}
          className="mx-auto mb-8"
        />
        <p className="text-xl text-black mb-8">
          Create and share beautiful countdowns for your special moments
        </p>
        <Link
          href="/start"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
        >
          Get Started →
        </Link>
        <p className="text-black mt-12 text-sm">
          A <span className="font-semibold text-red-500">Filmoja</span> product
        </p>
      </div>
    </div>
  );
}
