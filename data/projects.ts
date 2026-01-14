import { Project } from '@/types/project';

// This is where you'll add all your projects
// Simply add new objects to this array to display them on your website
export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'RiverGuard - AI-Powered Trash Detection',
    description: 'RiverGuard is a comprehensive video analysis platform that uses machine learning to detect garbage and debris in water bodies. The system processes video streams through a YOLO-based detection model and stores results in Firebase Firestore for tracking and analysis. help clean up rivers and streams.',
    image: '/images/project-1.png', // Place your project images in /public/images/
    githubLink: 'https://github.com/CollinT123/RiverGuard',
    techStack: ['Next.Js', 'TypeScript', 'Firebase', 'CSS', 'Python', 'YoloV12 Mini', 'Docker', 'Ubuntu Server', 'NGINX', 'Vercel', 'FireStore'],
    categories: ['Web Development', 'Docker', 'Computer Vision', 'AI', 'Firebase'],
    featured: true, // Featured projects appear on homepage
  },
  {
    id: 'project-2',
    title: 'BabbleBridge - Message Anybody Anywhere, Anytime, Any Language',
    description: 'Babble Bridge is a real-time multilingual chat application that enables seamless communication between users speaking different languages. The app automatically translates messages into each participant\'s native language, making cross-language communication effortless.',
    image: '/images/project-2.png',
    githubLink: 'https://github.com/DJBerzas/Babble-Bridge',
    techStack: ['React Native', 'Expo', 'Firebase', 'FireAuth', 'FireStore', 'Google Cloud Translation API'],
    categories: ['Firebase', 'React Native', 'API'],
    featured: true,
  },
  {
    id: 'project-3',
    title: 'Autonomous Tracking Camera - AI-Powered Detection',
    description: 'Autonomous Tracking Camera is a project designed as a proof of concept to build a camera that can track humans and record videos. It\'s purpose was to allow me to record videos of myself climbing, and then use AI to track my movements and record the videos.',
    image: '/images/project-3.jpg',
    githubLink: 'https://github.com/Dyno-man/Moving-Camera-Climbing',
    techStack: ['RPI 4B', 'Python', 'OpenCV', 'YoloV3', 'Web Sockets'],
    categories: ['Embedded Systems', 'Computer Vision', 'AI'],
    featured: true,
  },
  {
    id: 'project-4',
    title: 'CPU Scheduler Implementation',
    description: 'This project implements two CPU scheduling algorithms:Shortest Remaining Time First (SRTF) and Highest Response Ratio Next (HRRN).',
    image: '/images/project-4.png',
    githubLink: 'https://github.com/Dyno-man/OS_Proj2',
    techStack: ['Python'],
    categories: ['Operating Systems'],
    featured: false,
  },
  {
    id: 'project-5',
    title: 'Zero Knowledge Chess - Zero Knowledge Proofs for Chess',
    description: 'A chess game implementation in Rust that uses Zero-Knowledge proofs to verify the validity of chess games.',
    image: '/images/project-5.png',
    githubLink: 'https://github.com/Dyno-man/ZK_Chess',
    techStack: ['Rust', 'Zero-Knowledge Proofs'],
    categories: ['Cryptography'],
    featured: false,
  },
  {
    id: 'project-6',
    title: 'Receipt Finance Tracker - OCR model to track my personal finances',
    description: 'This is a personal finance tracking website that anyone can spin up on their own linux server. You will be able to setup your own backend by downloading this repo and running a single bash script.',
    image: '/images/project-5.png',
    githubLink: 'https://github.com/Dyno-man/Receipt-Finance-Tracker',
    techStack: ['Python', 'Docker', 'Computer Vision', 'OCR'],
    categories: ['Docker', 'Computer Vision', 'Python'],
    featured: false,
  },
];

// Helper function to get featured projects
export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

// Helper function to get all unique categories
export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  projects.forEach(project => {
    project.categories.forEach(category => categories.add(category));
  });
  return Array.from(categories).sort();
};

