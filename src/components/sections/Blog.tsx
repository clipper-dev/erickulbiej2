import React from "react";
import BlogCard from "../cards/BlogCard";
import { getPosts } from "../../../sanity/sanity-utils";
import { Post } from "../../types/Post";

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
          {posts.map((post: Post, index: number) => (
            <BlogCard key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
