import React from "react";
import BlogCard from "../cards/BlogCard";
import { Post } from "../../types/Post";
import { client } from "../../../sanity/lib/client";

export const revalidate = 60;
export async function getPosts() {
  const data = await client.fetch(
    `*[_type == "post"]{_id, publishedAt, bio, title, "categories": categories[]->title, "slug": slug.current, author->{name, "image":image.asset->url}, "mainImage": mainImage.asset->url, readingTime, body}`,
    {
      next: { revalidate: 60 },
      cache: "no-store",
    }
  );
  return data;
}
async function Blog() {
  const posts: Post[] = await getPosts();
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-lg flex flex-col gap-4 p-2">
        <div className="flex flex-row gap-2">
          <div className=" w-[4px] bg-indigo-600"></div>
          <h2 className=" self-start text-2xl lg:text-4xl font-bold">
            Article library 📰
          </h2>
        </div>
        <div className="flex flex-col w-full gap-4">
          {posts
            .sort(
              (a: Post, b: Post) =>
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
            )
            .map((post: Post, index: number) => (
              <BlogCard key={index} post={post} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
