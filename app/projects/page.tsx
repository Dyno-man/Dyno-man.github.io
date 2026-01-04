'use client';

import { useState, useMemo } from 'react';
import { projects, getAllCategories } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', ...getAllCategories()];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') {
      return projects;
    }
    return projects.filter(project =>
      project.categories.includes(selectedCategory)
    );
  }, [selectedCategory]);

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-dark-text animate-fade-in">
          Projects
        </h1>
        <p className="text-dark-text-muted mb-12 text-lg animate-slide-up">
          A collection of projects I've worked on. Filter by category to find what interests you.
        </p>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-3 animate-slide-up" style={{ animationDelay: '100ms' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-accent-blue text-white border border-accent-blue'
                  : 'bg-dark-surface border border-dark-border text-dark-text-muted hover:border-accent-blue hover:text-accent-blue'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <p className="text-dark-text-muted text-lg mb-4">
              No projects found in this category.
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-accent-blue hover:text-accent-blue-light transition-colors duration-200 underline"
            >
              View all projects
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

