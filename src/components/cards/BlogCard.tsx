import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Post } from "../../types/Post";
import Tag from "../crumbs/Tag";
interface Props {
  post: Post;
}

function BlogCard({ post }: Props) {
  const date = new Date(post.publishedAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <>
      <section className="w-full flex flex-col md:flex-row lg:flex-row gap-4 rounded-lg shadow-lg bg-white p-4">
        <div className="w-full md:max-w-md aspect-video flex-shrink-0 relative rounded-xl overflow-hidden">
          <Image
            alt={post.title}
            src={post.mainImage}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2">
            {post.categories.map((category, index) => (
              <Tag key={index} tag={category} />
            ))}
          </div>
          <Link href={post.slug}>
            <h2 className=" self-start text-xl lg:text-2xl font-bold hover:text-indigo-600 transition-all">
              {post.title}
            </h2>
          </Link>
          <span className="flex flex-row gap-2 items-center">
            <p className="text-sm md:text-base text-indigo-500">
              by {post.author.name}
            </p>
            <p className="text-sm md:text-base text-gray-500">•</p>
            <p className="text-sm md:text-base text-gray-500">
              {formattedDate}
            </p>
            <p className="text-sm md:text-base text-gray-500">•</p>
            <span className="flex flex-row gap-1 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 2C5.03 2 1 6.03 1 11C1 15.97 5.03 20 10 20C14.97 20 19 15.97 19 11C19 6.03 14.97 2 10 2ZM10 18C6.13 18 3 14.87 3 11C3 7.13 6.13 4 10 4C13.87 4 17 7.13 17 11C17 14.87 13.87 18 10 18ZM9 7H11V13H9V7Z"
                  fill="currentColor"
                />
              </svg>
              {/* reading time */}
              <p className="text-sm  md:text-base text-gray-500">
                {post.readingTime} min
              </p>
            </span>
          </span>
          <p>{post.bio}</p>
        </div>
      </section>
    </>
  );
}

export default BlogCard;
