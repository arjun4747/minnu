'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchFilterForm from '@/components/SearchFilterForm';
import DeveloperCard from '@/components/DeveloperCard';
import DeveloperCardSkeleton from '@/components/DeveloperCardSkeleton';
import { SearchFilterParams, DeveloperCardData } from '@/lib/types';
import { Search, AlertCircle, Users, RotateCcw, Sparkles, Terminal, Activity, ArrowRight } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const urlUsername = searchParams.get('username') || '';
  const urlLanguage = searchParams.get('language') || (urlUsername ? '' : 'TypeScript');
  const urlLocation = searchParams.get('location') || '';

  const [filters, setFilters] = useState<SearchFilterParams>({
    username: urlUsername,
    language: urlLanguage,
    location: urlLocation,
    minFollowers: urlUsername ? 0 : 5,
    minRepos: 0,
    sort: 'best_match',
    page: 1,
  });

  const [developers, setDevelopers] = useState<DeveloperCardData[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDevelopers = useCallback(async (searchFilters: SearchFilterParams) => {
    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (searchFilters.username) params.set('username', searchFilters.username);
    if (searchFilters.language) params.set('language', searchFilters.language);
    if (searchFilters.location) params.set('location', searchFilters.location);
    if (searchFilters.minFollowers)
      params.set('minFollowers', searchFilters.minFollowers.toString());
    if (searchFilters.minRepos)
      params.set('minRepos', searchFilters.minRepos.toString());
    if (searchFilters.sort) params.set('sort', searchFilters.sort);
    if (searchFilters.page) params.set('page', searchFilters.page.toString());

    try {
      const res = await fetch(`/api/search-developers?${params.toString()}`);
      const data = await res.json();

      if (!res.ok && (!data.developers || data.developers.length === 0)) {
        setError(data.error || 'Failed to fetch developer profiles.');
        setDevelopers([]);
        setTotalCount(0);
      } else {
        setDevelopers(data.developers || []);
        setTotalCount(data.total_count || data.developers?.length || 0);
        setError(null);
      }
    } catch (err: unknown) {
      setError('Network error occurred while fetching live GitHub data.');
      setDevelopers([]);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial search on mount
  useEffect(() => {
    fetchDevelopers(filters);
  }, [fetchDevelopers, filters]);

  const handleSearch = (newFilters: SearchFilterParams) => {
    setFilters(newFilters);
  };

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-700">
              <Terminal className="h-3 w-3 text-slate-900" />
              Talent Sourcing Engine
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-mono text-emerald-800 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Live GitHub API
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-950">
            Cracked Developer Directory
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Query GitHub engineers by username, technology stack, and geographic location. View real GraphQL contribution heatmaps, commit velocity, and star metrics.
          </p>
        </div>

        {/* Live Badges */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 shadow-sm">
            <Activity className="h-3.5 w-3.5 text-emerald-600" />
            <span>Sub-second Query</span>
          </div>
        </div>
      </div>

      {/* Filter Form */}
      <div className="mb-8">
        <SearchFilterForm
          initialFilters={filters}
          onSearch={handleSearch}
          isLoading={isLoading}
        />
      </div>

      {/* Search Results Summary Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2.5 text-xs text-slate-700">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
            <Users className="h-3.5 w-3.5" />
          </div>
          {isLoading ? (
            <span className="flex items-center gap-2 font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-ping" />
              Executing GitHub Graph Search...
            </span>
          ) : (
            <span className="font-mono">
              Showing <strong className="text-slate-950 font-bold">{developers.length}</strong> loaded of{' '}
              <strong className="text-emerald-700 font-bold">{totalCount.toLocaleString()}</strong> matched candidates
            </span>
          )}
        </div>

        <div className="text-[11px] font-mono text-slate-500">
          Current Filter:{' '}
          {filters.username && (
            <span className="text-emerald-800 font-semibold mr-1.5 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              @{filters.username}
            </span>
          )}
          <span className="text-slate-800 font-semibold">{filters.language || 'Any Language'}</span>
          {filters.location && <span> &bull; {filters.location}</span>}
        </div>
      </div>

      {/* Error Alert State */}
      {error && (
        <div className="mb-8 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-xs text-rose-800 shadow-sm">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
          <div className="space-y-1.5">
            <h3 className="font-bold text-rose-900 text-sm">GitHub API Notification</h3>
            <p className="leading-relaxed">{error}</p>
            <p className="text-[11px] text-slate-500">
              Note: Ensure a valid <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono text-slate-800">GITHUB_TOKEN</code> is configured in your environment for increased rate limits and GraphQL heatmap lookups.
            </p>
          </div>
        </div>
      )}

      {/* Loading Skeletons Grid */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DeveloperCardSkeleton />
          <DeveloperCardSkeleton />
          <DeveloperCardSkeleton />
          <DeveloperCardSkeleton />
        </div>
      )}

      {/* Empty Results State */}
      {!isLoading && !error && developers.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 mb-4">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-950">No Matching Profiles Located</h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
            No active engineers matched the specific combination of criteria. Try searching a specific handle directly, broadening your location, or switching language tags.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() =>
                handleSearch({
                  username: undefined,
                  language: 'TypeScript',
                  location: '',
                  minFollowers: 0,
                  minRepos: 0,
                  sort: 'best_match',
                })
              }
              className="flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-slate-800 transition-colors uppercase tracking-wider"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Search
            </button>
            <button
              onClick={() =>
                handleSearch({
                  username: 'shadcn',
                  language: undefined,
                  location: '',
                  minFollowers: 0,
                  minRepos: 0,
                  sort: 'best_match',
                })
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-mono font-medium text-slate-700 hover:text-black hover:bg-slate-100 transition-colors"
            >
              Try: @shadcn
            </button>
            <button
              onClick={() =>
                handleSearch({
                  username: 'torvalds',
                  language: undefined,
                  location: '',
                  minFollowers: 0,
                  minRepos: 0,
                  sort: 'best_match',
                })
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-mono font-medium text-slate-700 hover:text-black hover:bg-slate-100 transition-colors"
            >
              Try: @torvalds
            </button>
          </div>
        </div>
      )}

      {/* Developer Cards Grid */}
      {!isLoading && !error && developers.length > 0 && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {developers.map((dev) => (
            <DeveloperCard key={dev.profile.id} data={dev} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-12 text-center text-xs font-mono text-slate-500">
          Loading Candidate Directory...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
