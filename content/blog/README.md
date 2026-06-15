# Blog Content

Drop Obsidian Markdown files in this folder. No frontmatter required.

Example: `content/blog/projects/robot-build.md` becomes `/blog/projects/robot-build/`.

Rules:

- Title comes from filename: `robot-build.md` becomes `Robot Build`.
- Date comes from first git commit that added the file.
- Local uncommitted files use file modified time until committed.
- Category comes from first folder: `projects/robot-build.md` becomes `Projects`.
- Drafts go in `_drafts/` or start with `_`, like `_rough-idea.md`.
- Drafts show during local dev and hide in production.
- Wiki links work: `[[robot-build]]` and `[[robot-build|custom text]]`.
- Images should use normal Markdown: `![alt text](/blog/images/file.png)`.
