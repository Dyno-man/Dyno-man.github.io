import { Project } from '@/types/project';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <div 
      className={`group bg-dark-surface border border-dark-border rounded-lg overflow-hidden hover:border-accent-blue transition-all duration-300 ${
        featured ? 'animate-slide-up' : ''
      }`}
      style={{ animationDelay: featured ? '0ms' : undefined }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-dark-text group-hover:text-accent-blue transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-dark-text-muted mb-4 text-sm leading-relaxed">
          {project.description}
        </p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs bg-dark-bg border border-dark-border rounded text-dark-text-muted group-hover:border-accent-blue/50 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.categories.map((category) => (
            <span
              key={category}
              className="px-2 py-1 text-xs text-dark-text-muted border border-dark-border rounded"
            >
              {category}
            </span>
          ))}
        </div>

        {/* GitHub Link */}
        <Link
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-dark-text-muted hover:text-accent-blue transition-colors duration-200 group/link"
        >
          View on GitHub
          <svg
            className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-200"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

