import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { remark } from 'remark';
import html from 'remark-html';

const BLOG_ROOT = path.join(process.cwd(), 'content', 'blog');

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  category: string;
  tags: string[];
  draft: boolean;
  readingTime: string;
};

export type BlogPost = BlogPostMeta & {
  contentHtml: string;
};

export type BlogTreeNode = {
  name: string;
  path: string;
  type: 'folder' | 'post';
  slug?: string;
  date?: string;
  draft?: boolean;
  children?: BlogTreeNode[];
};

type RawPost = BlogPostMeta & {
  filePath: string;
  content: string;
};

function getMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return getMarkdownFiles(entryPath);
    }

    if (entry.isFile() && entry.name.endsWith('.md') && entry.name.toLowerCase() !== 'readme.md') {
      return [entryPath];
    }

    return [];
  });
}

function slugify(value: string): string {
  return value
    .replace(/\.md$/i, '')
    .trim()
    .toLowerCase()
    .replace(/_/g, '-')
    .replace(/[^a-z0-9/]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .replace(/\/+/g, '/');
}

function titleize(value: string): string {
  return value
    .replace(/\.md$/i, '')
    .replace(/^_+/, '')
    .replace(/^\d{4}-\d{2}-\d{2}-/, '')
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getRelativePath(filePath: string): string {
  return path.relative(BLOG_ROOT, filePath).split(path.sep).join('/');
}

function getSlug(filePath: string): string {
  const withoutExtension = getRelativePath(filePath).replace(/\.md$/i, '');
  return slugify(withoutExtension);
}

function isDraft(filePath: string): boolean {
  const parts = getRelativePath(filePath).split('/');
  return parts.some((part) => part === '_drafts') || path.basename(filePath).startsWith('_');
}

function getFallbackCategory(filePath: string): string {
  const folder = getRelativePath(filePath)
    .split('/')
    .find((part) => !part.endsWith('.md') && part !== '_drafts');

  return folder ? titleize(folder) : 'Notes';
}

function getGitDate(filePath: string): string | null {
  const commands = [
    ['log', '--follow', '--diff-filter=A', '--format=%aI', '--', filePath],
    ['log', '-1', '--format=%aI', '--', filePath],
  ];

  for (const args of commands) {
    try {
      const output = execFileSync('git', args, {
        cwd: process.cwd(),
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();

      if (output) {
        return output.split('\n').at(-1) || output;
      }
    } catch {
      // Fall back when git history unavailable, common for untracked local notes.
    }
  }

  return null;
}

function getPostDate(filePath: string): string {
  return getGitDate(filePath) || fs.statSync(filePath).mtime.toISOString();
}

function getReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
}

function getDescription(content: string): string | undefined {
  const paragraph = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith('#') && !block.startsWith('```'));

  if (!paragraph) {
    return undefined;
  }

  const text = paragraph
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/[>*_#-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return text.length > 180 ? `${text.slice(0, 177)}...` : text;
}

function parsePost(filePath: string): RawPost {
  const content = fs.readFileSync(filePath, 'utf8');

  return {
    filePath,
    slug: getSlug(filePath),
    title: titleize(path.basename(filePath)),
    date: getPostDate(filePath),
    description: getDescription(content),
    category: getFallbackCategory(filePath),
    tags: [],
    draft: isDraft(filePath),
    readingTime: getReadingTime(content),
    content,
  };
}

function shouldIncludePost(post: BlogPostMeta): boolean {
  return process.env.NODE_ENV !== 'production' || !post.draft;
}

function getRawPosts(): RawPost[] {
  return getMarkdownFiles(BLOG_ROOT)
    .map(parsePost)
    .filter(shouldIncludePost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function toMeta(post: RawPost): BlogPostMeta {
  const { filePath: _filePath, content: _content, ...meta } = post;
  return meta;
}

function buildWikiLinkLookup(posts: RawPost[]): Map<string, string> {
  const lookup = new Map<string, string>();

  for (const post of posts) {
    lookup.set(post.slug, post.slug);
    lookup.set(post.slug.split('/').at(-1) || post.slug, post.slug);
  }

  return lookup;
}

function convertWikiLinks(content: string, lookup: Map<string, string>): string {
  return content.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_match, target: string, label?: string) => {
    const slug = slugify(target);
    const resolvedSlug = lookup.get(slug) || slug;
    const linkText = label || target.replace(/\.md$/i, '');

    return `[${linkText}](/blog/${resolvedSlug}/)`;
  });
}

function sortTree(nodes: BlogTreeNode[]): BlogTreeNode[] {
  return nodes
    .map((node) => ({
      ...node,
      children: node.children ? sortTree(node.children) : undefined,
    }))
    .sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === 'folder' ? -1 : 1;
      }

      if (a.type === 'post' && b.type === 'post') {
        return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
      }

      return a.name.localeCompare(b.name);
    });
}

export function getAllPosts(): BlogPostMeta[] {
  return getRawPosts().map(toMeta);
}

export function getBlogTree(): BlogTreeNode[] {
  const root: BlogTreeNode[] = [];

  for (const post of getRawPosts()) {
    const parts = post.slug.split('/');
    let currentLevel = root;

    parts.slice(0, -1).forEach((part, index) => {
      const folderPath = parts.slice(0, index + 1).join('/');
      let folder = currentLevel.find((node) => node.type === 'folder' && node.path === folderPath);

      if (!folder) {
        folder = {
          name: titleize(part),
          path: folderPath,
          type: 'folder',
          children: [],
        };
        currentLevel.push(folder);
      }

      currentLevel = folder.children || [];
    });

    currentLevel.push({
      name: post.title,
      path: post.slug,
      type: 'post',
      slug: post.slug,
      date: post.date,
      draft: post.draft,
    });
  }

  return sortTree(root);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = getRawPosts();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return null;
  }

  const contentWithLinks = convertWikiLinks(post.content, buildWikiLinkLookup(posts));
  const processedContent = await remark().use(html).process(contentWithLinks);

  return {
    ...toMeta(post),
    contentHtml: processedContent.toString(),
  };
}
