export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  githubLink: string;
  techStack: string[];
  categories: string[];
  featured?: boolean; // For top projects on homepage
}

