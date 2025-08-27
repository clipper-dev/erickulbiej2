import React from "react";
import WritingContent from "./(content)/WritingContent";
import { mockArticles as articles } from "@/data/mockArticles";
// Types



// Server Component - Main Page
export default function WritingPortfolio() {
  const totalReadTime = articles.reduce((acc, a) => acc + a.readTime, 0);
  const totalHours = Math.round(totalReadTime / 60);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 py-16 md:py-24 mt-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900">
          Writings &amp; Publications
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-600">
          A collection of my work, from scientific research and professional
          insights to explorations in fiction.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 pb-24">
        <WritingContent articles={articles} />
      </main>

      {/* Footer Stats */}
      <footer className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-light">{articles.length}</div>
              <div className="text-sm text-gray-600 mt-1">Articles</div>
            </div>
            <div>
              <div className="text-2xl font-light">3</div>
              <div className="text-sm text-gray-600 mt-1">Categories</div>
            </div>
            <div>
              <div className="text-2xl font-light">{totalHours}h</div>
              <div className="text-sm text-gray-600 mt-1">Reading Time</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
