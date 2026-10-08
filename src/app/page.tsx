'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  ArrowRight,
  Star,
  GitFork,
  Code2,
  MapPin,
  Sparkles,
  GitCommit,
  CheckCircle2,
  Terminal,
  Activity,
  Flame,
} from 'lucide-react';

// Floating Heatmap Grid Card Component
interface HeatmapTileCardProps {
  grid: number[][]; // 0: gray, 1: light green, 2: medium, 3: dark green, 4: deep green
  className?: string;
  style?: React.CSSProperties;
}

const colorMap = [
  'bg-[#ebedf0]', // 0
  'bg-[#9be9a8]', // 1
  'bg-[#40c463]', // 2
  'bg-[#30a14e]', // 3
  'bg-[#216e39]', // 4
];

function FloatingHeatmapTile({ grid, className = '', style }: HeatmapTileCardProps) {
  return (
    <div
      className={`floating-heatmap-card pointer-events-none select-none transition-transform duration-700 ${className}`}
      style={style}
    >
      <div className="flex flex-col gap-1.5 p-1">
        {grid.map((row, rIdx) => (
          <div key={rIdx} className="flex gap-1.5">
            {row.map((cell, cIdx) => (
              <div
                key={cIdx}
                className={`h-4 w-4 rounded-[4px] ${colorMap[cell] || colorMap[0]} transition-all`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('engineers who built a simulation for power grids');

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) {
      router.push('/search');
      return;
    }

    // If query starts with @ or is a single handle, route to username search
    if (query.startsWith('@')) {
      router.push(`/search?username=${encodeURIComponent(query.replace('@', ''))}`);
    } else if (!query.includes(' ') && query.length < 25) {
      router.push(`/search?username=${encodeURIComponent(query)}`);
    } else {
      router.push(`/search?language=TypeScript&location=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#fafafa] overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-900">
      {/* ========================================================
          HERO SECTION
      ======================================================== */}
      <section className="relative px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:px-8">
        {/* Floating Contribution Heatmap Cards in Background (Excluding cards behind heading) */}
        <div className="pointer-events-none absolute inset-0 max-w-7xl mx-auto overflow-hidden">
          {/* Top-Left Card (5 cols x 3 rows) */}
          <FloatingHeatmapTile
            grid={[
              [0, 2, 2, 0, 0],
              [2, 2, 3, 2, 0],
              [2, 0, 0, 0, 0],
            ]}
            className="hidden lg:block absolute top-6 left-6 opacity-90 shadow-sm"
          />

          {/* Top Right Card (3 cols x 3 rows) */}
          <FloatingHeatmapTile
            grid={[
              [1, 0, 3],
              [2, 2, 3],
              [0, 1, 1],
            ]}
            className="hidden lg:block absolute top-10 right-10 opacity-90 shadow-sm"
          />

          {/* Mid-Left Card (3 cols x 5 rows) */}
          <FloatingHeatmapTile
            grid={[
              [0, 1, 3],
              [2, 2, 2],
              [2, 2, 0],
              [0, 0, 0],
              [0, 0, 0],
            ]}
            className="hidden xl:block absolute top-[360px] -left-2 opacity-90 shadow-sm"
          />

          {/* Lower Left Card (4 cols x 4 rows) */}
          <FloatingHeatmapTile
            grid={[
              [0, 1, 2, 0],
              [0, 3, 1, 2],
              [0, 2, 0, 1],
              [0, 0, 0, 0],
            ]}
            className="hidden md:block absolute top-[520px] left-[8%] opacity-90 shadow-sm"
          />

          {/* Far Right Card (3 cols x 5 rows) */}
          <FloatingHeatmapTile
            grid={[
              [0, 1, 2],
              [2, 2, 2],
              [1, 2, 0],
              [0, 1, 0],
              [0, 0, 3],
            ]}
            className="hidden xl:block absolute top-[340px] -right-2 opacity-90 shadow-sm"
          />

          {/* Lower Right Card 1 (3 cols x 3 rows) */}
          <FloatingHeatmapTile
            grid={[
              [0, 0, 1],
              [3, 1, 1],
              [0, 2, 0],
            ]}
            className="hidden md:block absolute top-[540px] right-[28%] opacity-90 shadow-sm"
          />

          {/* Lower Right Card 2 (4 cols x 4 rows) */}
          <FloatingHeatmapTile
            grid={[
              [1, 2, 0, 0],
              [4, 2, 2, 0],
              [1, 0, 3, 0],
              [0, 0, 0, 0],
            ]}
            className="hidden md:block absolute top-[530px] right-[10%] opacity-90 shadow-sm"
          />

          {/* Bottom Left Small Card */}
          <FloatingHeatmapTile
            grid={[
              [0, 1],
              [0, 0],
            ]}
            className="hidden lg:block absolute top-[740px] left-[2%] opacity-85 shadow-sm"
          />

          {/* Bottom Center-Left Card */}
          <FloatingHeatmapTile
            grid={[
              [1, 2, 0],
              [4, 0, 0],
              [1, 1, 0],
            ]}
            className="hidden lg:block absolute top-[750px] left-[18%] opacity-85 shadow-sm"
          />
        </div>

        {/* Hero Content */}
        <div className="relative mx-auto max-w-4xl text-center">
          {/* Main Headline with Instrument Serif */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-slate-950 leading-[1.04]">
            Cracked engineers are
            <br />
            <span className="italic font-normal">not on LinkedIn</span>
          </h1>

          {/* Center Rezaish Showcase Card */}
          <div className="mt-10 sm:mt-12 mx-auto max-w-xl text-left">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] transition-all">
              {/* Profile Top Row */}
              <div className="flex items-center justify-between">
                {/* User Info */}
                <div className="flex items-center gap-3">
                  {/* Helmet Avatar Icon */}
                  <div className="relative h-11 w-11 rounded-full bg-slate-900 flex items-center justify-center p-0.5 overflow-hidden shadow-inner">
                    <svg
                      className="h-9 w-9"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="48" height="48" rx="24" fill="#18181b" />
                      {/* Helmet visor */}
                      <path
                        d="M10 24C10 16.268 16.268 10 24 10C31.732 10 38 16.268 38 24V28C38 32.4183 34.4183 36 30 36H18C13.5817 36 10 32.4183 10 28V24Z"
                        fill="#f59e0b"
                      />
                      <path
                        d="M13 22C13 18.6863 15.6863 16 19 16H29C32.3137 16 35 18.6863 35 22V25H13V22Z"
                        fill="#09090b"
                      />
                      <rect x="15" y="27" width="18" height="3" rx="1.5" fill="#e4e4e7" />
                      <circle cx="24" cy="20" r="1.5" fill="#38bdf8" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-950 leading-tight">
                      Rezaish
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      @dtrungtin
                    </p>
                  </div>
                </div>

                {/* GitHub Mark */}
                <div className="flex items-center gap-1.5 text-slate-950">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span className="text-sm font-bold tracking-tight">GitHub</span>
                </div>
              </div>

              {/* Integrated Search Bar (Interactive) */}
              <form onSubmit={handleHeroSubmit} className="my-5">
                <div className="flex items-center rounded-full bg-[#f1f3f5] hover:bg-[#eaecee] focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-300 pl-4 pr-1.5 py-1.5 transition-all">
                  <Search className="h-4 w-4 text-slate-400 shrink-0 mr-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="engineers who built a simulation for power grids"
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white hover:scale-105 active:scale-95 transition-transform shrink-0"
                    title="Search cracked engineers"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>

              {/* Repository Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Link
                    href="/search?language=TypeScript"
                    className="text-sm sm:text-base font-semibold text-blue-600 hover:underline"
                  >
                    manufacturing-line-simulation
                  </Link>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                    Public
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  a power-grid simulator that models real-time transmission dynamics to make manufacturing lines more efficient
                </p>

                {/* Stars and Forks */}
                <div className="flex items-center gap-4 pt-1 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 text-slate-400" />
                    <span>892</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GitFork className="h-3.5 w-3.5 text-slate-400" />
                    <span>156</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TRY NOW Centered Button */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/search"
              className="rounded-lg bg-black px-8 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-slate-800 active:scale-95 transition-all"
            >
              TRY NOW
            </Link>
          </div>

          {/* Quick Preset Handles */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span className="font-medium text-slate-400">Inspect live cracked profiles:</span>
            <button
              onClick={() => router.push('/search?username=torvalds')}
              className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-mono text-slate-700 hover:border-slate-400 hover:text-black transition-all"
            >
              @torvalds
            </button>
            <button
              onClick={() => router.push('/search?username=shadcn')}
              className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-mono text-slate-700 hover:border-slate-400 hover:text-black transition-all"
            >
              @shadcn
            </button>
            <button
              onClick={() => router.push('/search?username=antfu')}
              className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-mono text-slate-700 hover:border-slate-400 hover:text-black transition-all"
            >
              @antfu
            </button>
            <button
              onClick={() => router.push('/search?username=gaearon')}
              className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-mono text-slate-700 hover:border-slate-400 hover:text-black transition-all"
            >
              @gaearon
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          VALUE PROPOSITION / RECRUITER ADVANTAGE (Light Mode)
      ======================================================== */}
      <section className="border-t border-slate-200/80 bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              Direct GitHub Intelligence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-slate-950 tracking-tight">
              Why top recruiters source on GitHire
            </h2>
            <p className="mt-3 text-sm text-slate-600 max-w-xl mx-auto">
              Real code contributions, GraphQL heatmaps, and repository metrics replace self-reported resumes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-slate-200 bg-[#fafafa] p-6 transition-all hover:border-slate-300 hover:shadow-md">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 font-bold">
                <Flame className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-2">Live Commit Velocity</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Identify developers who are actively committing code right now. We analyze 7-day and 30-day activity intervals directly from GitHub’s live event stream.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-slate-200 bg-[#fafafa] p-6 transition-all hover:border-slate-300 hover:shadow-md">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-bold">
                <GitCommit className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-2">GraphQL Contribution Heatmaps</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Inspect authentic GitHub contribution calendars. Spot long-term engineering discipline and consistent shipping streaks across multiple months.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-slate-200 bg-[#fafafa] p-6 transition-all hover:border-slate-300 hover:shadow-md">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-bold">
                <Star className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-2">Verified Open-Source Impact</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Surface repositories with real stars, forks, and pull requests. Distinguish between tutorial forks and genuine production systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          TELEMETRY BAR (Clean Light Mode)
      ======================================================== */}
      <section className="border-y border-slate-200 bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
          <div>
            <div className="text-3xl font-extrabold text-slate-950 font-mono">120M+</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">GitHub Profiles Indexed</p>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-emerald-700 font-mono">&lt; 350ms</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Live GraphQL Query Latency</p>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-950 font-mono">100%</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Real-Time GitHub Data</p>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-emerald-700 font-mono">0</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Outdated Resumes</p>
          </div>
        </div>
      </section>

      {/* ========================================================
          BOTTOM CTA SECTION
      ======================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-[#fafafa] p-8 sm:p-12 text-center shadow-sm">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-slate-950 tracking-tight">
            Find your next cracked engineer today
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Search by username, programming stack, location, or repository impact. Zero recruiter fluff.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/search"
              className="rounded-lg bg-black px-7 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-slate-800 transition-all shadow-md active:scale-95"
            >
              Open Talent Dashboard
            </Link>
            <Link
              href="/login"
              className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-black transition-all"
            >
              Recruiter Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
