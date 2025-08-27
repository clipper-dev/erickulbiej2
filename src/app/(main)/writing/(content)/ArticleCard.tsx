"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, BookOpen } from "lucide-react";

// Assumes Article is a global type
// Assumes you have a global type file. If not, export this interface.
interface Article {
  slug: string; // Used for the URL, e.g., /writings/my-first-story
  title: string;
  description: string;
  category: "Science" | "Fiction" | "Maritime";
  publishedDate: string; // e.g., "2023-10-26"
  readingTime: number; // in minutes
  imageUrl?: string; // Optional cover image
}
interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/writings/${article.slug}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        {article.imageUrl && (
          <div className="overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <CardHeader>
          <Badge variant="secondary" className="w-fit mb-2">{article.category}</Badge>
          <CardTitle className="text-xl font-bold leading-snug">
            {article.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">{article.description}</p>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{new Date(article.publishedDate).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <BookOpen className="h-3 w-3" />
            <span>{article.readingTime} min read</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}