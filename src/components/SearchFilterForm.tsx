'use client';

import { useState } from 'react';
import { SearchFilterParams } from '@/lib/types';
import {
  Search,
  Filter,
  RotateCcw,
  Code2,
  MapPin,
  Users,
  FolderGit2,
  ArrowUpDown,
  Sparkles,
  Zap,
  AtSign,
  X,
} from 'lucide-react';

interface SearchFilterFormProps {
  initialFilters: SearchFilterParams;
  onSearch: (filters: SearchFilterParams) => void;
  isLoading: boolean;
}

const LANGUAGES = [
  { value: 'all', label: 'All Languages' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'Python', label: 'Python' },
  { value: 'Go', label: 'Go' },
  { value: 'Rust', label: 'Rust' },
  { value: 'Java', label: 'Java' },
  { value: 'C++', label: 'C++' },
  { value: 'Ruby', label: 'Ruby' },
];

const QUICK_TAGS = ['TypeScript', 'Python', 'Go', 'Rust', 'JavaScript'];
const FEATURED_HANDLES = ['torvalds', 'shadcn', 'gaearon', 'leerob', 'antfu'];

const SORT_OPTIONS = [
  { value: 'best_match', label: 'Best Match' },
  { value: 'followers', label: 'Follower Count' },
  { value: 'recently_active', label: 'Commit Velocity' },
  { value: 'repositories', label: 'Total Public Repos' },
];

export default function SearchFilterForm({
  initialFilters,
  onSearch,
  isLoading,
}: SearchFilterFormProps) {
  const [username, setUsername] = useState(initialFilters.username || '');
  const [language, setLanguage] = useState(initialFilters.language || 'all');
  const [location, setLocation] = useState(initialFilters.location || '');
  const [minFollowers, setMinFollowers] = useState<number | ''>(
    initialFilters.minFollowers !== undefined && initialFilters.minFollowers > 0
      ? initialFilters.minFollowers
      : ''
  );
  const [minRepos, setMinRepos] = useState<number | ''>(
    initialFilters.minRepos !== undefined && initialFilters.minRepos > 0
      ? initialFilters.minRepos
      : ''
  );
  const [sort, setSort] = useState<SearchFilterParams['sort']>(
    initialFilters.sort || 'best_match'
  );

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSearch({
      username: username.trim() || undefined,
      language: language === 'all' ? undefined : language,
      location: location.trim() || undefined,
      minFollowers: typeof minFollowers === 'number' ? minFollowers : 0,
      minRepos: typeof minRepos === 'number' ? minRepos : 0,
      sort,
      page: 1,
    });
  };

  const handleQuickTagClick = (tag: string) => {
    const newLang = language === tag ? 'all' : tag;
    setLanguage(newLang);
    onSearch({
      username: username.trim() || undefined,
      language: newLang === 'all' ? undefined : newLang,
      location: location.trim() || undefined,
      minFollowers: typeof minFollowers === 'number' ? minFollowers : 0,
      minRepos: typeof minRepos === 'number' ? minRepos : 0,
      sort,
      page: 1,
    });
  };

  const handleHandlePresetClick = (handle: string) => {
    const newUsername = username === handle ? '' : handle;
    setUsername(newUsername);
    onSearch({
      username: newUsername || undefined,
      language: language === 'all' ? undefined : language,
      location: location.trim() || undefined,
      minFollowers: typeof minFollowers === 'number' ? minFollowers : 0,
      minRepos: typeof minRepos === 'number' ? minRepos : 0,
      sort,
      page: 1,
    });
  };

  const handleReset = () => {
    setUsername('');
    setLanguage('all');
    setLocation('');
    setMinFollowers('');
    setMinRepos('');
    setSort('best_match');
    onSearch({
      username: undefined,
      language: undefined,
      location: undefined,
      minFollowers: 0,
      minRepos: 0,
      sort: 'best_match',
      page: 1,
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      {/* Header Bar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
            <Filter className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-950 tracking-wide">Developer Filter Station</h2>
            <p className="text-[11px] text-slate-500">Query live GitHub developers by username, programming stack, location &amp; commit pace</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-mono text-slate-600 hover:border-slate-300 hover:bg-slate-100 hover:text-black transition-all"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Quick Stacks & Preset Handles */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-500 mr-1 flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-emerald-600" />
          Popular Stacks:
        </span>
        {QUICK_TAGS.map((tag) => {
          const isActive = language === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => handleQuickTagClick(tag)}
              className={`rounded-xl px-3 py-1 text-xs font-medium transition-all ${
                isActive
                  ? 'border border-black bg-black text-white shadow-sm'
                  : 'border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
              }`}
            >
              {tag}
            </button>
          );
        })}

        <span className="hidden sm:inline text-slate-300 mx-1">|</span>

        <span className="text-xs font-mono text-slate-500 mr-1 flex items-center gap-1">
          <AtSign className="h-3 w-3 text-slate-700" />
          Featured Handles:
        </span>
        {FEATURED_HANDLES.map((handle) => {
          const isSelected = username.toLowerCase() === handle.toLowerCase();
          return (
            <button
              key={handle}
              type="button"
              onClick={() => handleHandlePresetClick(handle)}
              className={`rounded-xl px-2.5 py-1 text-xs font-mono font-medium transition-all ${
                isSelected
                  ? 'border border-emerald-600 bg-emerald-600 text-white shadow-sm'
                  : 'border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
              }`}
            >
              @{handle}
            </button>
          );
        })}
      </div>

      {/* Main Filter Form Inputs */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {/* Username Input */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <AtSign className="h-3.5 w-3.5 text-slate-500" />
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. torvalds, shadcn"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-3 pr-7 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors font-mono"
              />
              {username && (
                <button
                  type="button"
                  onClick={() => setUsername('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Language Dropdown */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <Code2 className="h-3.5 w-3.5 text-slate-500" />
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors cursor-pointer"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location Input */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <MapPin className="h-3.5 w-3.5 text-slate-500" />
              Location
            </label>
            <input
              type="text"
              placeholder="e.g. San Francisco, Remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors"
            />
          </div>

          {/* Min Followers */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <Users className="h-3.5 w-3.5 text-slate-500" />
              Min Followers
            </label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 10"
              value={minFollowers}
              onChange={(e) =>
                setMinFollowers(e.target.value === '' ? '' : parseInt(e.target.value, 10))
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors font-mono"
            />
          </div>

          {/* Min Public Repos */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <FolderGit2 className="h-3.5 w-3.5 text-slate-500" />
              Min Repos
            </label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 5"
              value={minRepos}
              onChange={(e) =>
                setMinRepos(e.target.value === '' ? '' : parseInt(e.target.value, 10))
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors font-mono"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <ArrowUpDown className="h-3.5 w-3.5 text-slate-500" />
              Sort Priority
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SearchFilterParams['sort'])}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-500 font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Search live GitHub database by handle or stack</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 rounded-xl bg-black px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
          >
            {isLoading ? (
              <Zap className="h-3.5 w-3.5 animate-spin text-white" />
            ) : (
              <Search className="h-3.5 w-3.5 text-white" />
            )}
            <span>{isLoading ? 'Scanning GitHub...' : 'Search Candidates'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
