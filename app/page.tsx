import { getFeaturedProjects } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';
import ProfileCarousel from '@/components/ProfileCarousel';
import SocialLinks from '@/components/SocialLinks';
import Link from 'next/link';

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-dark-text">
            Hi, I'm Grant Versluis
          </h1>
          <p className="text-xl md:text-2xl text-dark-text-muted mb-8 max-w-3xl">
          A software engineer passionate about building reliable systems and impactful technology.          </p>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-6 py-3 bg-accent-blue text-white rounded-lg font-medium hover:bg-accent-blue-hover transition-colors duration-200 animate-scale-in"
              >
                View All Projects
              </Link>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center justify-center px-6 py-3 border border-dark-border text-dark-text rounded-lg font-medium hover:border-accent-blue hover:text-accent-blue transition-colors duration-200 animate-scale-in"
                style={{ animationDelay: '100ms' }}
              >
                Download Resume
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '200ms' }}>
              <SocialLinks />
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-dark-border">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-dark-text animate-slide-up">
            About Me
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Carousel */}
            <div className="w-full md:w-1/3 flex-shrink-0">
              <ProfileCarousel 
                images={[
                  '/images/profile-1.jpg',
                  '/images/profile-2.jpg',
                  '/images/profile-3.jpg',
                  '/images/profile-4.jpg',
                ]}
              />
            </div>
            
            {/* About Me Text */}
            <div className="flex-1 prose prose-invert max-w-none">
              <p className="text-dark-text-muted text-lg leading-relaxed mb-4">
                {/* Replace this with your actual about me content */}
               Hi, I’m Grant, a Software Engineering Intern at Assurant and a Computer Science student with a passion for building thoughtful, reliable systems. I enjoy working across the stack, with particular interests in embedded systems, computer vision, and backend development. I’m driven by curiosity and enjoy tackling problems that push me to learn new tools, technologies, and design patterns.
              </p>
              <p className="text-dark-text-muted text-lg leading-relaxed">
                {/* Add more paragraphs about yourself here */}
                Outside of my professional work, I’m constantly building and refining personal projects and experimenting with new ideas. When I’m not coding, you’ll usually find me rock climbing, hiking, or exploring ways to apply technology to real world problems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-dark-border">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-text animate-slide-up">
            Featured Projects
          </h2>
          <Link
            href="/projects"
            className="text-dark-text-muted hover:text-accent-blue transition-colors duration-200 text-sm"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProjectCard project={project} featured />
            </div>
          ))}
        </div>
        {featuredProjects.length === 0 && (
          <p className="text-dark-text-muted text-center py-12">
            No featured projects yet. Add some projects to your data file and mark them as featured!
          </p>
        )}
      </section>
    </div>
  );
}

