import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { HiShare } from "react-icons/hi";
import { getPost } from "../../../sanity/sanity-utils";
import Tag from "../../components/crumbs/Tag";
import ShareButton from "../../components/nav/ShareButton";
import { Post } from "../../types/Post";

interface Props {
  params: { slug: string };
}

export default async function BlogPost({ params }: Props) {
  const post: Post = await getPost(params.slug);
  const date = new Date(post.publishedAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  /* share article function  */
  return (
    <>
      <div className="w-full flex flex-col items-center pt-10">
        <div className="w-full max-w-screen-lg flex flex-col gap-4 p-2">
          <div className="flex flex-col gap-4">
            {/* cover image */}
            <div className="w-full aspect-video flex flex-row gap-2 relative">
              <Image
                src={post.mainImage}
                alt={post.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            {/* tags section */}
            <div className="flex flex-row gap-2">
              {post.categories.map((category, index) => (
                <Tag key={index} tag={category} />
              ))}
            </div>
            {/* title and subtitle */}
            <h1 className="text-3xl md:text-5xl font-bold">{post.title}</h1>
            <p className="text-lg md:text-2xl text-gray-500">{post.bio}</p>
            {/* author box */}
            <div className="flex flex-row gap-2 items-center py-2 border-t-2 border-b-2">
              <article className="w-10 h-10 rounded-full bg-indigo-100 relative overflow-hidden">
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </article>
              <article className="flex flex-col">
                <h3 className="text-lg font-bold">{post.author.name}</h3>
                <span className="flex flex-row gap-2 items-center">
                  <p className="text-sm text-gray-500">{formattedDate}</p>
                  <p className="text-sm text-gray-500">•</p>
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
                    <p className="text-sm text-gray-500">
                      {post.readingTime} min
                    </p>
                  </span>
                </span>
              </article>
              {/* share button */}
              <ShareButton post={
                {
                  title: post.title,
                  bio: post.bio,
                  image: post.mainImage,
                }
              } />
            </div>

            {/* body */}
            <div className="flex flex-col gap-4">
              {post.body.map((block: any, index) => {
                if (block._type === "block" && block.style === "h1") {
                  return (
                    <h1 key={index} className=" text-3xl">
                      {block.children[0].text}
                    </h1>
                  );
                } else if (block._type === "block" && block.style === "h2") {
                  return (
                    <h2 key={index} className="font-bold text-xl md:text-2xl">
                      {block.children[0].text}
                    </h2>
                  );
                } else if (block._type === "block" && block.style === "h3") {
                  return (
                    <h3 key={index} className="text-lg md:text-xl font-bold">
                      {block.children[0].text}
                    </h3>
                  );
                } else if (
                  block._type === "block" &&
                  (block.listItem === "number" || block.listItem === "bullet")
                ) {
                  return (
                    <li
                      key={index}
                      className="font-serif text-lg md:text-xl pl-4"
                    >
                      {block.children[0].text}
                    </li>
                  );
                } else if (block._type === "block") {
                  return (
                    <p key={index} className="font-serif text-lg md:text-xl">
                      {block.children[0].text}
                    </p>
                  );
                } else if (block._type === "image") {
                  return (
                    <div key={index}>
                      <div
                        key={index}
                        className="w-full aspect-video flex flex-row gap-2 relative"
                      >
                        <Image
                          src={
                            "https://cdn.sanity.io/images/uxkp37gu/production/" +
                            block.asset._ref
                              .slice(block.asset._ref.indexOf("-") + 1)
                              .replace("-png", "") +
                            ".png"
                          }
                          alt={block.alt}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                        {/* label below image */}
                        <div className="absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-50 text-white p-2">
                          {block.alt}
                        </div>
                      </div>
                    </div>
                  );
                } else if (block._type === "code") {
                  return (
                    <pre key={index} className="bg-gray-100 p-2 rounded-md">
                      <code>{block.code}</code>
                    </pre>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
