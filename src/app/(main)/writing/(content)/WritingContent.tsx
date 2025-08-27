"use client";
import { ArrowRight, Clock } from "lucide-react";
import React, { useState } from "react";

// Client Component for filtering
export default function WritingContent({ articles }: { articles: Article[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All", count: articles.length },
    {
      id: "fiction",
      label: "Fiction",
      count: articles.filter((a) => a.category === "fiction").length,
    },
    {
      id: "scientific",
      label: "Scientific",
      count: articles.filter((a) => a.category === "scientific").length,
    },
    {
      id: "maritime",
      label: "Maritime",
      count: articles.filter((a) => a.category === "maritime").length,
    },
  ];

  const filteredArticles =
    selectedCategory === "all"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "fiction":
        return "text-blue-500";
      case "scientific":
        return "text-green-600";
      case "maritime":
        return "text-indigo-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div>
      {/* Category Filters */}
      <div className="flex gap-6 mb-12 border-b border-gray-200">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`pb-3 text-sm transition-all relative ${
              selectedCategory === category.id
                ? "text-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>{category.label}</span>
            <span className="ml-1.5 text-gray-400">({category.count})</span>
            {selectedCategory === category.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
            )}
          </button>
        ))}
      </div>

      {/* Articles List */}
      <div className="space-y-12">
        {filteredArticles.map((article) => (
          <article key={article._id} className="group opacity-0 animate-fadeIn">
            <a href={`/writing/${article.slug}`} className="block">
              <div className="grid md:grid-cols-12 gap-4 md:gap-8">
                {/* Meta Information */}
                <div className="md:col-span-3 text-sm text-gray-500">
                  <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-2">
                    <time dateTime={article.publishedAt}>
                      {formatDate(article.publishedAt)}
                    </time>
                    <span className="hidden md:block">•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime} min</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-9">
                  <div className="mb-2">
                    <span
                      className={`inline-block text-xs uppercase tracking-wider ${getCategoryColor(
                        article.category
                      )}`}
                    >
                      {article.category}
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-light mb-3 group-hover:text-blue-500 transition-colors">
                    {article.title}
                  </h2>

                  <p className="text-gray-600 leading-relaxed mb-3">
                    {article.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-1 text-sm text-gray-500 group-hover:text-blue-500 transition-colors">
                    Read more
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>


      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
