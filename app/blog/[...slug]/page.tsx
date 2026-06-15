import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

type BlogPostPageProps = {
  params: {
    slug: string[];
  };
};

export const dynamicParams = false;

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug.split('/'),
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug.join('/'));

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: `${post.title} - Grant Versluis`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug.join('/'));

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade-in">
        <Link
          href="/blog"
          className="inline-flex text-dark-text-muted hover:text-accent-blue transition-colors duration-200 mb-10"
        >
          &larr; Back to blog
        </Link>

        <header className="mb-10 pb-10 border-b border-dark-border">
          <div className="flex flex-wrap gap-3 text-sm text-dark-text-muted mb-5">
            <span>{formatDate(post.date)}</span>
            <span>/</span>
            <span>{post.readingTime}</span>
            <span>/</span>
            <span>{post.category}</span>
            {post.draft && <span className="text-accent-blue">Draft</span>}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-dark-text mb-5 leading-tight">
            {post.title}
          </h1>
          {post.description && (
            <p className="text-xl text-dark-text-muted leading-relaxed">
              {post.description}
            </p>
          )}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-dark-surface border border-dark-border text-sm text-dark-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </div>
  );
}
