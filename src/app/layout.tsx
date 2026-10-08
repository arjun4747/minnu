import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'GitHire — Recruiter Intelligence for GitHub Developers',
  description:
    'Find software developers based on real live GitHub activity, top repositories, contribution heatmaps, and verified commit history.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-slate-900 antialiased flex flex-col min-h-screen selection:bg-emerald-100 selection:text-emerald-900 font-sans">
        <ClerkProvider>
          {/* Top Forest Green Announcement Bar */}
          <div className="bg-[#14532d] text-white text-xs font-medium py-2 px-4 text-center tracking-tight transition-colors hover:bg-[#166534]">
          <a href="/search" className="inline-flex items-center gap-1 hover:underline">
          Are you a cracked engineer? See your GitHire profile
          </a>
          </div>

          <Navbar />
          <main className="flex-grow relative">{children}</main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}