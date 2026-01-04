# Personal Portfolio Website

A modern, scalable personal website built with Next.js, TypeScript, and Tailwind CSS. Easily add new projects by updating the data file.

## Features

- 🏠 **Homepage** with featured projects, about me section, and resume download
- 📁 **Projects Page** with category filtering
- 🎨 **Dark Theme** with minimalist design and smooth animations
- 📱 **Fully Responsive** design
- 🚀 **GitHub Pages Ready** - configured for static export

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your website.

### Building for Production

```bash
npm run build
```

This will create an `out` directory with static files ready for deployment.

## Adding Projects

To add a new project, simply edit `/data/projects.ts` and add a new project object to the array:

```typescript
{
  id: 'unique-project-id',
  title: 'Project Title',
  description: 'Project description...',
  image: '/images/your-image.jpg', // Place images in /public/images/
  githubLink: 'https://github.com/yourusername/project',
  techStack: ['React', 'TypeScript', 'Next.js'],
  categories: ['Web Development'],
  featured: true, // Set to true to show on homepage
}
```

## Customization

### About Me Section

Edit the about me content in `/app/page.tsx` (lines ~50-65).

### Resume

Place your resume PDF in `/public/resume.pdf`. The download link is already configured.

### Styling

The website uses Tailwind CSS with a custom dark theme. You can modify colors in `/tailwind.config.js`.

## Deploying to GitHub Pages

1. Build the project: `npm run build`
2. The `out` directory contains your static site
3. Push the `out` directory contents to your `gh-pages` branch, or use GitHub Actions

### GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with navigation
│   ├── page.tsx         # Homepage
│   ├── projects/
│   │   └── page.tsx     # Projects page
│   └── globals.css      # Global styles
├── components/
│   ├── Navigation.tsx   # Navigation component
│   └── ProjectCard.tsx # Project card component
├── data/
│   └── projects.ts      # Project data (edit this to add projects)
├── types/
│   └── project.ts       # TypeScript types
└── public/
    ├── images/          # Project images go here
    └── resume.pdf       # Your resume PDF
```

## License

MIT

