import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Home, Briefcase, PenSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "404: Page Not Found",
  description: "The page you are looking for could not be found.",
};

// A simple, inline SVG component for the animated compass
function AnimatedCompass() {
  return (
    <div className="relative w-32 h-32 text-blue-400 mb-8">
      <Compass className="w-full h-full animate-wobble" strokeWidth={1} />
    </div>
  );
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-white">
      <AnimatedCompass />
      <h1 className="text-3xl sm:text-5xl font-bold text-zinc-900 tracking-tight">
        404: Navigational Error
      </h1>
      <p className="mt-4 max-w-md text-base sm:text-lg text-zinc-600">
        You&apos;ve ventured into uncharted waters. The page you&apos;re looking for
        might have been moved, renamed, or sailed off into the digital sunset.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Home className="mr-2 h-4 w-4" />
          Return to Home Port
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/work"
            className="inline-flex items-center font-medium text-zinc-700 hover:text-zinc-900 transition-colors"
          >
            <Briefcase className="mr-1.5 h-4 w-4" />
            My Work
          </Link>
          <Link
            href="/writings"
            className="inline-flex items-center font-medium text-zinc-700 hover:text-zinc-900 transition-colors"
          >
            <PenSquare className="mr-1.5 h-4 w-4" />
            My Writings
          </Link>
        </div>
      </div>
    </div>
  );
}