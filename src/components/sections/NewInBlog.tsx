import React from "react";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import Tag from "../crumbs/Tag";
import BlogCard from "../cards/BlogCard";

async function NewInBlog() {
  async function getBlogPosts() {
    const files = fs.readdirSync(path.join("src/articles"));
    const posts = files.map((filename) => {
      /* get the slug */
      const slug = filename.replace(".md", "");
      /* get frontmatter */
      const markdownWithMeta = fs.readFileSync(
        path.join("src/articles", filename),
        "utf-8"
      );
      const { data } = matter(markdownWithMeta);
      let frontmatter = {
        title: data.title,
        bio: data.bio,
        tag: data.tag,
        image: data.image,
      };
      return {
        slug,
        frontmatter,
      };
    });
    return posts;
  }
  const posts = await getBlogPosts();
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-lg flex flex-col gap-4 p-2">
        <div className="flex flex-row gap-2">
          <div className=" w-[4px] bg-indigo-600"></div>
          <h2 className=" self-start text-2xl lg:text-4xl font-bold">
            What's new in blog 📰
          </h2>
        </div>
        <div className="flex flex-col w-full gap-4">
          {posts.map((post, index) => (
            <BlogCard post={post} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewInBlog;
