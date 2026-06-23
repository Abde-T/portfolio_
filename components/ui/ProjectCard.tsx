import clsx from "clsx";
import { ReactNode } from "react";

interface ProjectCardProps {
  label: string;
  title: string;
  description: string;
  techs: string[];
  thumbnail: ReactNode;
  liveLink?: string;
  repoLink?: string;
}

export function ProjectCard({
  label,
  title,
  description,
  techs,
  thumbnail,
  liveLink = "#",
  repoLink = "#",
}: ProjectCardProps) {
  return (
    <div
      className="group flex h-[80vh] w-[600px] shrink-0 flex-col gap-6"
      data-cursor="project"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-sharp bg-[#0A0A0A] transition-transform duration-400 ease-out group-hover:scale-[1.01]">
        {thumbnail}
        
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {techs.map((tech) => (
            <div
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-md"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 transition-transform duration-400 ease-out group-hover:-translate-y-2">
        <div className="flex items-center justify-between font-mono text-sm text-ink-muted">
          <span>{label}</span>
          <div className="flex items-center gap-4">
            <a href={liveLink} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              Live ↗
            </a>
            <a href={repoLink} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              Repo ↗
            </a>
          </div>
        </div>
        <h3 className="font-display text-3xl font-bold">{title}</h3>
        <p className="font-body text-ink-muted leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
