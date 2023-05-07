import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Post } from "../../types/Post";
import Tag from "../crumbs/Tag";
interface Props {
  post: Post
}

function BlogCard({ post }: Props) {
  return (
    <>
      <div className="w-full flex flex-col md:flex-row lg:flex-row gap-4 rounded-lg shadow-lg bg-white p-4">
        <div className="w-full md:w-64 aspect-video flex-shrink-0 relative rounded-xl overflow-hidden">
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
            <h3 className=" self-start text-xl lg:text-2xl font-semibold hover:text-indigo-600 transition-all">
              {post.title}
            </h3>
          </Link>
          <p>{post.bio}</p>
        </div>
      </div>
    </>
  );
}

export default BlogCard;
