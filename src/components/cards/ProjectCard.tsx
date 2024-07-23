/* eslint-disable @next/next/no-img-element */
import React from "react";
interface Props {
  project: Project;
}
export default function ProjectCard({ project }: Props) {
  return (
    <article className="flex flex-col gap-4">
      <img
        src={project.image}
        alt={project.name}
        className="w-full aspect-square rounded-xl ek-border-black border-[3px] border-black hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300"
        loading="lazy"
      />
      <div className="flex flex-row gap-2">
        {project.keywords.map((keyword, index) => (
          <span key={index} className="font-semibold text-xs text-blue-600 bg-blue-200 rounded-full px-4 py-2">
            {keyword}
          </span>
        ))}
      </div>
      <h2 className="font-semibold text-xl lg:text-3xl">{project.name}</h2>
      <p className="text-zinc-500 font-medium text-sm lg:text-base">
        {project.description}
      </p>
    </article>
  );
}
