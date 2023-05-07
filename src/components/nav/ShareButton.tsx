"use client";
import React from "react";
import { HiShare } from "react-icons/hi";
interface Props {
  post: {
    title: string;
    bio: string;
    image: string;
  };
}
function ShareButton({ post }: Props) {
  const shareArticle = async () => {
    try {
      await navigator.share({
        title: post.title,
        text: post.bio,
        url: window.location.href,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center hover:animate-pulse"
      onClick={shareArticle}
    >
      <HiShare className="text-indigo-500" />
    </button>
  );
}

export default ShareButton;
