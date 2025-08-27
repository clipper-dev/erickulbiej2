interface Article {
  _id: string;
  title: string;
  content: string;
  likes: number;
  excerpt: string;
  category: "fiction" | "scientific" | "maritime";
  readTime: number;
  publishedAt: string;
  slug: string;
  isSpecial?: boolean;
  specialFeatures?: {
    hasInteractiveDemo?: boolean;
    hasVideoContent?: boolean;
    hasDownloadableResources?: boolean;
    customLayout?: string;
    externalUrl?: string;
    featured?: boolean;
    collaborators?: string[];
    awards?: string[];
  };
}
