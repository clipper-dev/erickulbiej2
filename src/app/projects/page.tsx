import { Metadata } from "next";
import { projectsLeft, projectsRight } from "@/data/projects";
import { ProjectCard } from "./(components)/ProjectCard";

export const metadata: Metadata = {
  title: "Work & Projects",
  description: "A collection of web development and engineering projects by Eric Kulbiej.",
};

export default function WorkPage() {
  const PROJECTS_DATA = [...projectsLeft, ...projectsRight];
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-24 sm:py-32">
      <header className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900">
          My Work
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-600">
          A selection of projects where I&apos;ve merged my passions for
          maritime engineering and modern web technology.
        </p>
      </header>

      <div className="flex flex-col gap-20 md:gap-28">
        {PROJECTS_DATA.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            isReversed={index % 2 !== 0}
          />
        ))}
      </div>
    </div>
  );
}