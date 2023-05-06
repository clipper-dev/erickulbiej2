import React from "react";

function ProjectHero() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-lg flex flex-col gap-4 p-2">
        <div className="flex flex-row gap-2 pt-12">
          <div className=" w-[4px] bg-indigo-600"></div>
          <h1 className=" self-start text-3xl lg:text-5xl font-bold">
            Scientific portfolio 🛳️
          </h1>
        </div>
        <span className="text-lg lg:text-xl text-gray-500">
          Welcome to the showcase of my scientific endeavors! I&apos;m
          passionate about maritime and navigational technologies, focusing on
          improving the safety and efficiency of sea-going vessels. My research
          is rooted in practical applications, aiming to create a positive
          impact in the maritime industry. Here&apos;s a glimpse into my areas
          of interest and expertise:
        </span>
        <ul className="list-disc list-inside">
          <li className="text-lg lg:text-xl text-gray-500">
            Collision avoidance algorithms for enhanced maritime safety.
          </li>
          <li className="text-lg lg:text-xl text-gray-500">
            Vessel movement prediction for better navigational decision-making.
          </li>
          <li className="text-lg lg:text-xl text-gray-500">
            Development of naval artificial intelligence systems.
          </li>
          <li className="text-lg lg:text-xl text-gray-500">
            Autonomous navigation systems for future seafaring vessels.
          </li>
        </ul>
        <span className="text-lg lg:text-xl text-gray-500">
          Feel free to explore my research papers and projects, and learn about
          the innovative ideas that drive my passion for science.
        </span>
      </div>
    </div>
  );
}

export default ProjectHero;
