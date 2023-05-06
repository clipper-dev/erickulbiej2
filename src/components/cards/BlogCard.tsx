import Image from "next/image";
import React from "react";
import Tag from "../crumbs/Tag";
interface Props {
  post: {
    slug: string;
    frontmatter: {
      title: string;
      bio: string;
      tag: string;
      image: string;
    };
  };
}

function BlogCard({ post }: Props) {
  return (
    <>
      <div className="w-full flex flex-col md:flex-row lg:flex-row gap-4 rounded-lg shadow-lg bg-white p-4">
        <div className="w-full md:w-64 aspect-video relative rounded-xl overflow-hidden">
          <Image
            alt={post.frontmatter.title}
            src={post.frontmatter.image}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-col">
          <Tag tag={post.frontmatter.tag} />
          <h3 className=" self-start text-xl lg:text-2xl font-semibold">
            {post.frontmatter.title}
          </h3>
          <p>{post.frontmatter.bio}</p>
        </div>
      </div>
    </>
  );
}

export default BlogCard;
