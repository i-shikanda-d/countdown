import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-600 flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <Image
          src="/images/timely.png"
          alt="Countdown Hero"
          width={300}
          height={300}
          className="mx-auto mb-8"
        />
        <p className="text-xl text-white mb-8">
          Create and share beautiful countdowns for your special moments
        </p>
        <Link
          href="/start"
          className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
        >
          Get Started →
        </Link>
        <p className="text-white mt-12 text-sm">
          A <span className="font-semibold text-orange-500">Filmoja</span> product
        </p>
      </div>
    </div>
  );
}
