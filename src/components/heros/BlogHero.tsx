import React from "react";

function BlogHero() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-lg flex flex-col gap-4 p-2">
        <div className="flex flex-row gap-2 pt-12">
          <div className=" w-[4px] bg-indigo-600"></div>
          <h1 className=" self-start text-3xl lg:text-5xl font-bold">
            My blog aka food for thoughts 🍔
          </h1>
        </div>
        <span className="text-lg lg:text-xl text-gray-500">
          Welcome to my blog, a space dedicated to the pursuit of personal
          growth and the art of living a balanced, fulfilling life. As a
          passionate advocate for productivity, time management, and
          self-development, I believe in the power of reflection and learning as
          catalysts for meaningful change. In this blog, you&apos;ll find a
          collection of thoughts, insights, and experiences centered around:
        </span>
        <ul className="list-disc list-inside">
          <li className="text-lg lg:text-xl text-gray-500">
            Productivity hacks for maximizing efficiency in work and daily life.
          </li>
          <li className="text-lg lg:text-xl text-gray-500">
            Time management strategies to make the most of every moment.
          </li>
          <li className="text-lg lg:text-xl text-gray-500">
            Self-development techniques to foster personal growth and
            self-awareness.
          </li>
          <li className="text-lg lg:text-xl text-gray-500">
            Contemplations on the quality of life and the pursuit of happiness.
          </li>
        </ul>
        <span className="text-lg lg:text-xl text-gray-500">
          Join me on this journey of self-discovery and let&apos;s explore the path
          towards a more purposeful, contented existence together.
        </span>
      </div>
    </div>
  );
}

export default BlogHero;
