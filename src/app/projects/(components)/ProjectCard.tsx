/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TagBadge } from "@/components/brand/TagBadge";

interface ProjectCardProps {
  project: Project;
  isReversed?: boolean;
}

export function ProjectCard({ project, isReversed = false }: ProjectCardProps) {
  const flexDirection = isReversed ? "md:flex-row-reverse" : "md:flex-row";

  return (
    <article
      className={`flex flex-col ${flexDirection} gap-8 md:gap-12 items-center`}
    >
      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <Link href={project.link} target="_blank" rel="noopener noreferrer">
          <img
            src={project.image}
            alt={`${project.name} preview`}
            className="w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          />
        </Link>
      </div>

      {/* Text Content Section */}
      <div className="w-full md:w-1/2">
        <h3 className="text-2xl font-bold text-zinc-900 mb-3">
          {project.name}
        </h3>
        <p className="text-zinc-600 mb-5 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.keywords.map((keyword) => (
            <TagBadge key={keyword} text={keyword} />
          ))}
        </div>
        <Link
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center font-semibold text-red-600 hover:text-red-700 transition-colors"
        >
          View Project <ArrowUpRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}