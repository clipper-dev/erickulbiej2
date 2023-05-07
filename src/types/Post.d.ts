import { PortableTextBlock } from "sanity";

export interface Post {
    slug: string;
    title: string;
    bio: string;
    tag: string;
    readingTime: number;
    author: {
      name: string;
      image: string;
    };
    authorImage: string;
    mainImage: string;
    categories: string[];
    publishedAt: string;
    body: PortableTextBlock[];
  };