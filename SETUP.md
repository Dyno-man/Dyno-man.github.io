# Setup Instructions

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add your resume:**
   - Place your resume PDF file in `/public/resume.pdf`
   - The download link on the homepage will automatically work

3. **Add project images:**
   - Place project images in `/public/images/`
   - Use descriptive filenames (e.g., `project-1.jpg`, `my-app.png`)
   - Recommended size: 800x600px or similar aspect ratio

4. **Customize your projects:**
   - Edit `/data/projects.ts`
   - Add your projects following the sample structure
   - Set `featured: true` for projects you want on the homepage

5. **Update About Me:**
   - Edit the about me section in `/app/page.tsx` (around line 50-65)

6. **Customize your name:**
   - Update "Grant Versluis" in:
     - `/app/layout.tsx` (metadata title)
     - `/components/Navigation.tsx` (navigation brand)
     - `/app/page.tsx` (hero section)

7. **Run development server:**
   ```bash
   npm run dev
   ```

8. **Build for production:**
   ```bash
   npm run build
   ```

## GitHub Pages Deployment

The website is configured for GitHub Pages static export. To deploy:

1. Push your code to a GitHub repository
2. Enable GitHub Pages in repository settings
3. The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically deploy on push to main branch

Or manually:
1. Run `npm run build`
2. Push the `out` directory to the `gh-pages` branch

## Project Structure

- **Adding Projects**: Just add objects to the array in `/data/projects.ts`
- **Styling**: Modify `/tailwind.config.js` for theme colors
- **Layout**: Edit components in `/components/` directory
- **Pages**: Edit pages in `/app/` directory

