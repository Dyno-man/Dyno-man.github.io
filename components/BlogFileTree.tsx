'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { BlogTreeNode } from '@/lib/blog';

type BlogFileTreeProps = {
  tree: BlogTreeNode[];
};

function getInitialExpanded(nodes: BlogTreeNode[]): Record<string, boolean> {
  return nodes.reduce<Record<string, boolean>>((expanded, node) => {
    if (node.type === 'folder') {
      expanded[node.path] = true;
      Object.assign(expanded, getInitialExpanded(node.children || []));
    }

    return expanded;
  }, {});
}

function TreeNodes({ nodes, level, expanded, onToggle }: {
  nodes: BlogTreeNode[];
  level: number;
  expanded: Record<string, boolean>;
  onToggle: (path: string) => void;
}) {
  return (
    <ul className={level === 0 ? 'space-y-1' : 'mt-1 space-y-1'}>
      {nodes.map((node) => {
        const paddingLeft = `${level * 0.75}rem`;

        if (node.type === 'folder') {
          const isExpanded = expanded[node.path];

          return (
            <li key={node.path}>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-dark-text-muted hover:bg-dark-bg hover:text-dark-text transition-colors duration-200"
                style={{ paddingLeft }}
                onClick={() => onToggle(node.path)}
              >
                <span className="w-4 text-xs text-accent-blue">{isExpanded ? 'v' : '>'}</span>
                <span>{node.name}</span>
              </button>
              {isExpanded && node.children && (
                <TreeNodes nodes={node.children} level={level + 1} expanded={expanded} onToggle={onToggle} />
              )}
            </li>
          );
        }

        return (
          <li key={node.path}>
            <Link
              href={`/blog/${node.slug}`}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-dark-text-muted hover:bg-dark-bg hover:text-accent-blue transition-colors duration-200"
              style={{ paddingLeft }}
            >
              <span className="w-4 text-xs">md</span>
              <span className="truncate">{node.name}</span>
              {node.draft && <span className="ml-auto text-xs text-accent-blue">draft</span>}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function BlogFileTree({ tree }: BlogFileTreeProps) {
  const [expanded, setExpanded] = useState(() => getInitialExpanded(tree));
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleFolder = (path: string) => {
    setExpanded((current) => ({
      ...current,
      [path]: !current[path],
    }));
  };

  const treeContent = tree.length > 0 ? (
    <TreeNodes nodes={tree} level={0} expanded={expanded} onToggle={toggleFolder} />
  ) : (
    <p className="text-sm text-dark-text-muted">No posts yet.</p>
  );

  return (
    <>
      <div className="lg:hidden bg-dark-surface border border-dark-border rounded-xl p-4 mb-8">
        <button
          type="button"
          className="flex w-full items-center justify-between text-left text-dark-text"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="text-sm font-semibold uppercase tracking-wide">Files</span>
          <span className="text-accent-blue">{mobileOpen ? 'Hide' : 'Show'}</span>
        </button>
        {mobileOpen && <div className="mt-4">{treeContent}</div>}
      </div>

      <aside className="hidden lg:block lg:sticky lg:top-24 self-start bg-dark-surface border border-dark-border rounded-xl p-5 max-h-[calc(100vh-7rem)] overflow-y-auto animate-fade-in">
        <h2 className="text-sm font-semibold text-dark-text mb-4 uppercase tracking-wide">Files</h2>
        {treeContent}
      </aside>
    </>
  );
}
