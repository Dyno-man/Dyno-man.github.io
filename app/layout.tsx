import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';

export const metadata: Metadata = {
  title: 'Grant Versluis - Portfolio',
  description: 'Personal portfolio website showcasing my projects and experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <div className="fixed inset-0 z-0">
          <AnimatedBackground />
        </div>
        <Navigation />
        <main className="min-h-screen relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}

