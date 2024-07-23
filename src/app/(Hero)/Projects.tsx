import React from "react";
import ProjectCard from "../../components/cards/ProjectCard";
import { projectsLeft, projectsRight } from "../../data/projects";

export default function Projects() {
  return (
    <div className="w-full flex flex-col items-center" id="projects">
      <div className="w-full max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 my-12 md:my-24">
        <section className="flex flex-col gap-20 md:gap-24 max-w-[90%] mx-auto">
          <div className="h-12 md:h-24 lg:h-36"></div>
          {projectsLeft.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </section>
        <section className="flex flex-col gap-20 md:gap-24 max-w-[90%] mx-auto">
          {projectsRight.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
          <div className="h-12 md:h-24 lg:h-36"></div>
        </section>
      </div>
    </div>
  );
}
