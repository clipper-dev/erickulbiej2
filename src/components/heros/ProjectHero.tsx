import React from "react";

function ProjectHero() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-lg flex flex-col gap-4 p-2">
        <div className="flex flex-row gap-2 pt-12">
          <div className=" w-[4px] bg-indigo-600"></div>
          <h1 className=" self-start text-3xl lg:text-5xl font-bold">
            Webdev portfolio 📰
          </h1>
        </div>
        <span className="text-lg lg:text-xl text-gray-500">
          Welcome to my professional projects showcase! As a freelance website
          developer with over two years of experience, I&apos;ve had the
          pleasure of working on a diverse range of projects. I believe in
          keeping things straightforward, efficient, and engaging. Below,
          you&apos;ll find some of my most interesting projects that highlight
          my skillset and dedication to quality:
        </span>
        <ul className="list-disc list-inside">
          <li className="text-lg lg:text-xl text-gray-500">
            Over 10 projects completed, each tailored to the unique needs of my
            clients.
          </li>
          <li className="text-lg lg:text-xl text-gray-500">
            Consistent focus on delivering results that combine functionality
            and aesthetics.
          </li>
          <li className="text-lg lg:text-xl text-gray-500">
            Commitment to staying up-to-date with the latest web development
            trends and technologies.
          </li>
        </ul>
        <span className="text-lg lg:text-xl text-gray-500">
          Feel free to explore these projects and see for yourself how my
          down-to-earth approach can make a difference in the digital space.
        </span>
      </div>
    </div>
  );
}

export default ProjectHero;
