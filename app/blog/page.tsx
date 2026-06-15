import Link from 'next/link';
import BlogFileTree from '@/components/BlogFileTree';
import { getAllPosts, getBlogTree } from '@/lib/blog';

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export default function BlogPage() {
  const posts = getAllPosts();
  const tree = getBlogTree();

  return (
    <div className="pt-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mb-12 animate-fade-in">
          <p className="text-accent-blue text-sm font-medium mb-3">Blog</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-dark-text">
            Notes, writeups, and field logs
          </h1>
          <p className="text-dark-text-muted text-lg leading-relaxed">
            Markdown posts from my Obsidian workflow, organized by folder structure and git history.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
          <BlogFileTree tree={tree} />

          <div className="space-y-6">
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-dark-surface border border-dark-border rounded-xl p-6 hover:border-accent-blue transition-all duration-200 animate-slide-up"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex flex-wrap gap-3 text-sm text-dark-text-muted mb-4">
                  <span>{formatDate(post.date)}</span>
                  <span>/</span>
                  <span>{post.readingTime}</span>
                  <span>/</span>
                  <span>{post.category}</span>
                  {post.draft && (
                    <span className="text-accent-blue">Draft</span>
                  )}
                </div>
                <h2 className="text-2xl font-semibold text-dark-text mb-3 hover:text-accent-blue transition-colors duration-200">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="text-dark-text-muted leading-relaxed mb-4">
                    {post.description}
                  </p>
                )}
              </Link>
            ))}

            {posts.length === 0 && (
              <div className="bg-dark-surface border border-dark-border rounded-xl p-8 text-center animate-fade-in">
                <h2 className="text-2xl font-semibold text-dark-text mb-3">No posts yet</h2>
                <p className="text-dark-text-muted">
                  Add Markdown files to <code className="text-accent-blue">content/blog</code> to publish posts.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
