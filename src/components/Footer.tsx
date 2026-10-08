import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white text-slate-500 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Logo & Description */}
          <div className="flex items-center gap-3">
            <Link href="/" className="group flex items-center gap-2 transition-transform hover:opacity-90">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-black text-white shadow-sm">
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="18" cy="18" r="3" />
                  <circle cx="6" cy="6" r="3" />
                  <path d="M18 15V9a9 9 0 0 0-9-9" />
                  <path d="M6 9v12" />
                </svg>
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-950 select-none">
                Git<span className="text-emerald-600">Hire</span>
              </span>
            </Link>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">Live GitHub Engineering Intelligence</span>
          </div>

          {/* Quick Links & Status */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-6 text-slate-600">
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>GitHub API Operational</span>
            </div>
            <Link href="/" className="hover:text-black transition-colors">
              Overview
            </Link>
            <Link href="/search" className="hover:text-black transition-colors">
              Talent Search
            </Link>
            <Link href="/login" className="hover:text-black transition-colors">
              Recruiter Sign In
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-slate-600 hover:text-black transition-colors"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} GitHire. Real engineers are not on LinkedIn.</p>
          <p className="flex items-center gap-1">
            Engineered with Next.js &amp; GraphQL
          </p>
        </div>
      </div>
    </footer>
  );
}
