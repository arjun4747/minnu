'use client';

import { useState } from 'react';
import Image from 'next/image';
import ActivityBadge, { LastActiveIndicator } from './ActivityBadge';
import ContributionHeatmap from './ContributionHeatmap';
import { DeveloperCardData } from '@/lib/types';
import {
  Globe,
  MapPin,
  Users,
  UserPlus,
  Star,
  Calendar,
  FolderGit2,
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Building2,
  Mail,
  GitFork,
  Flame,
} from 'lucide-react';

interface DeveloperCardProps {
  data: DeveloperCardData;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export default function DeveloperCard({
  data,
  isExpanded = false,
  onToggleExpand,
}: DeveloperCardProps) {
  const { profile, activity, contributions, topRepos, totalStars } = data;
  const [copied, setCopied] = useState(false);

  // Date parsing
  const joinedDate = profile.created_at ? new Date(profile.created_at) : null;
  const joinedYear = joinedDate ? joinedDate.getFullYear() : 'Unknown';
  const joinedFormatted = joinedDate
    ? joinedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : 'Unknown';
  const currentYear = new Date().getFullYear();
  const activePeriodText = `${joinedYear} – ${currentYear}`;

  // Social link detection
  const websiteUrl = profile.blog
    ? profile.blog.startsWith('http')
      ? profile.blog
      : `https://${profile.blog}`
    : null;

  const isBlogLinkedIn = !!websiteUrl && /linkedin\.com\/in\//i.test(websiteUrl);
  const bioLinkedInMatch = profile.bio?.match(
    /https?:\/\/(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_\-%]+/i
  );
  const linkedInUrl = isBlogLinkedIn
    ? websiteUrl
    : bioLinkedInMatch
    ? bioLinkedInMatch[0]
    : null;

  const cleanWebsiteUrl = isBlogLinkedIn ? null : websiteUrl;
  const twitterUrl = profile.twitter_username
    ? `https://x.com/${profile.twitter_username}`
    : null;
  const githubUrl = profile.html_url;

  const handleCopyProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(profile.html_url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onToggleExpand) {
      onToggleExpand();
    }
  };

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-300 ${
        isExpanded
          ? 'border-emerald-300 ring-2 ring-emerald-500/20 shadow-lg bg-white p-5 sm:p-6'
          : 'border-slate-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-slate-300'
      }`}
    >
      <div>
        {/* Top Header Section */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <Image
                src={profile.avatar_url}
                alt={profile.login}
                width={56}
                height={56}
                unoptimized
                className="rounded-full border border-slate-200 object-cover ring-2 ring-slate-100 group-hover:ring-slate-300 transition-all"
              />
              <span
                className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${
                  activity.isRecentlyActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                }`}
                title={activity.isRecentlyActive ? 'Active recently' : 'Inactive'}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <ActivityBadge activity={activity} />
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                {profile.location && (
                  <span className="flex items-center gap-1 text-slate-600 font-medium">
                    <MapPin className="h-3 w-3 text-slate-400" />
                    {profile.location}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Social Icons & External Actions (Top Right) */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopyProfile}
              title="Copy GitHub Profile URL"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition-all hover:bg-slate-100 hover:text-black cursor-pointer"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-600" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>

            {cleanWebsiteUrl && (
              <a
                href={cleanWebsiteUrl}
                target="_blank"
                rel="noreferrer"
                title={`Portfolio: ${cleanWebsiteUrl}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition-all hover:bg-slate-100 hover:text-black"
              >
                <Globe className="h-3.5 w-3.5" />
              </a>
            )}

            {twitterUrl && (
              <a
                href={twitterUrl}
                target="_blank"
                rel="noreferrer"
                title={`Twitter / X: @${profile.twitter_username}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition-all hover:bg-slate-100 hover:text-black"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            )}

            {linkedInUrl && (
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noreferrer"
                title="LinkedIn Profile"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition-all hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            )}

            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              title="Open GitHub Profile"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition-all hover:bg-black hover:text-white hover:border-black"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Candidate Name Button (Interactive Toggle) */}
        <div className="mb-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleToggle}
              className="group/name flex items-center flex-wrap gap-2 text-left font-bold text-lg sm:text-xl text-slate-950 hover:text-emerald-700 transition-colors cursor-pointer focus:outline-none"
              title={isExpanded ? 'Click candidate name to collapse profile' : 'Click candidate name to expand profile'}
            >
              <span className="group-hover/name:underline underline-offset-4 decoration-emerald-500">
                {profile.name || profile.login}
              </span>
              <span className="text-xs font-mono font-normal text-slate-500">@{profile.login}</span>
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-sans font-semibold px-2.5 py-0.5 rounded-full border transition-all ${
                  isExpanded
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200 group-hover/name:bg-emerald-100'
                }`}
              >
                <span>{isExpanded ? 'Active Dossier' : 'Inspect Profile'}</span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </span>
            </button>
            <LastActiveIndicator activity={activity} />
          </div>

          {profile.bio && (
            <p className="mt-2 text-xs text-slate-600 leading-relaxed font-sans line-clamp-2">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Collapsed Summary Stats Bar */}
        {!isExpanded && (
          <div className="mb-2 grid grid-cols-4 gap-2 rounded-xl border border-slate-200 bg-slate-50/70 p-2.5 text-center">
            <div className="rounded-lg py-1 px-1">
              <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 uppercase font-mono tracking-wider">
                <Users className="h-3 w-3 text-slate-400" />
                Followers
              </div>
              <div className="mt-1 text-xs font-bold text-slate-900 font-mono">
                {profile.followers.toLocaleString()}
              </div>
            </div>
            <div className="rounded-lg py-1 px-1 border-l border-slate-200">
              <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 uppercase font-mono tracking-wider">
                <FolderGit2 className="h-3 w-3 text-slate-400" />
                Repos
              </div>
              <div className="mt-1 text-xs font-bold text-slate-900 font-mono">
                {profile.public_repos.toLocaleString()}
              </div>
            </div>
            <div className="rounded-lg py-1 px-1 border-l border-slate-200">
              <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 uppercase font-mono tracking-wider">
                <Star className="h-3 w-3 text-amber-500" />
                Stars
              </div>
              <div className="mt-1 text-xs font-bold text-amber-700 font-mono">
                {totalStars.toLocaleString()}
              </div>
            </div>
            <div className="rounded-lg py-1 px-1 border-l border-slate-200">
              <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 uppercase font-mono tracking-wider">
                <Calendar className="h-3 w-3 text-slate-400" />
                Joined
              </div>
              <div className="mt-1 text-xs font-bold text-slate-900 font-mono">{joinedYear}</div>
            </div>
          </div>
        )}

        {/* Collapsed Footer Callout */}
        {!isExpanded && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400">ID: {profile.id}</span>
            <button
              type="button"
              onClick={handleToggle}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
            >
              <span>Expand Candidate Dossier</span>
              <ChevronDown className="h-3.5 w-3.5 text-emerald-700" />
            </button>
          </div>
        )}

        {/* EXPANDED PROFILE SECTION (Smooth Height & Opacity Transition) */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isExpanded
              ? 'grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-slate-200'
              : 'grid-rows-[0fr] opacity-0 pointer-events-none'
          }`}
          style={{
            gridTemplateRows: isExpanded ? '1fr' : '0fr',
            transition: 'grid-template-rows 300ms ease, opacity 300ms ease',
          }}
        >
          <div className="overflow-hidden space-y-5">
            {/* 1. PROFILE HEADER DETAILS & SOCIAL LINKS */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200">
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  <Flame className="h-3 w-3 text-emerald-600" />
                  Candidate Dossier
                </span>
                {profile.company && (
                  <span className="flex items-center gap-1.5 font-medium text-slate-700">
                    <Building2 className="h-3.5 w-3.5 text-slate-400" />
                    {profile.company}
                  </span>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-1.5 text-slate-600 hover:text-black transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    {profile.email}
                  </a>
                )}
              </div>

              {/* Verified Profile Links */}
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-800 hover:bg-black hover:text-white hover:border-black transition-colors shadow-2xs"
                >
                  <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>

                {cleanWebsiteUrl && (
                  <a
                    href={cleanWebsiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors shadow-2xs"
                  >
                    <Globe className="h-3 w-3 text-slate-600" />
                    Website
                  </a>
                )}

                {twitterUrl && (
                  <a
                    href={twitterUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors shadow-2xs"
                  >
                    <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    X/Twitter
                  </a>
                )}

                {linkedInUrl && (
                  <a
                    href={linkedInUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50/70 px-2.5 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors shadow-2xs"
                  >
                    <svg className="h-3 w-3 fill-current text-blue-700" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    LinkedIn
                  </a>
                )}
              </div>
            </div>

            {/* 2. DEVELOPER STATISTICS (6-Metric Overview) */}
            <div>
              <div className="mb-2 text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                GitHub Metrics & Velocity
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-center">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 uppercase font-mono">
                    <Users className="h-3 w-3 text-emerald-600" />
                    Followers
                  </div>
                  <div className="mt-1 text-sm font-bold text-slate-900 font-mono">
                    {profile.followers.toLocaleString()}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-center">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 uppercase font-mono">
                    <UserPlus className="h-3 w-3 text-slate-500" />
                    Following
                  </div>
                  <div className="mt-1 text-sm font-bold text-slate-900 font-mono">
                    {profile.following.toLocaleString()}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-center">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 uppercase font-mono">
                    <Star className="h-3 w-3 text-amber-500" />
                    Total Stars
                  </div>
                  <div className="mt-1 text-sm font-bold text-amber-700 font-mono">
                    {totalStars.toLocaleString()}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-center">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 uppercase font-mono">
                    <FolderGit2 className="h-3 w-3 text-blue-600" />
                    Repositories
                  </div>
                  <div className="mt-1 text-sm font-bold text-slate-900 font-mono">
                    {profile.public_repos.toLocaleString()}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-center">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 uppercase font-mono">
                    <Calendar className="h-3 w-3 text-purple-600" />
                    Joined GitHub
                  </div>
                  <div className="mt-1 text-xs font-bold text-slate-900 font-mono">
                    {joinedFormatted}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-center">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 uppercase font-mono">
                    <Flame className="h-3 w-3 text-rose-500" />
                    Recent Activity
                  </div>
                  <div className="mt-1 text-xs font-bold text-emerald-800 font-mono">
                    {activity.lastActiveDaysAgo === 0
                      ? 'Active Today'
                      : `${activity.lastActiveDaysAgo}d ago`}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. CONTRIBUTION SECTION */}
            <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
              <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-100 text-emerald-800">
                    <Flame className="h-3 w-3 text-emerald-700" />
                  </div>
                  <span className="text-xs font-bold text-slate-900">
                    GitHub Contribution Activity
                    <span className="ml-1.5 font-normal text-[11px] text-slate-500">
                      ({contributions.totalContributions.toLocaleString()} total &bull; Active: {activePeriodText})
                    </span>
                  </span>
                </div>
                <LastActiveIndicator activity={activity} />
              </div>
              <ContributionHeatmap contributions={contributions} />
            </div>

            {/* 4. MOST RELEVANT PROJECTS */}
            {topRepos.length > 0 && (
              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <FolderGit2 className="h-3.5 w-3.5 text-slate-500" />
                    <span>Most Relevant Repositories</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {topRepos.length} featured of {profile.public_repos} total
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {topRepos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="group/repo flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-3 transition-all hover:border-slate-300 hover:bg-slate-100 hover:shadow-2xs"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="truncate text-xs font-bold text-slate-900 group-hover/repo:text-blue-600 transition-colors">
                            {repo.name}
                          </span>
                          <ExternalLink className="h-3 w-3 shrink-0 text-slate-400 opacity-0 group-hover/repo:opacity-100 transition-opacity" />
                        </div>
                        {repo.description ? (
                          <p className="line-clamp-2 text-[10px] text-slate-600 leading-relaxed font-sans">
                            {repo.description}
                          </p>
                        ) : (
                          <p className="text-[10px] text-slate-400 italic">No description provided</p>
                        )}
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-200/60 pt-2 font-mono">
                        {repo.language ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-white border border-slate-200 px-1.5 py-0.5 text-[9px] font-medium text-slate-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            {repo.language}
                          </span>
                        ) : (
                          <span />
                        )}
                        <div className="flex items-center gap-2 text-slate-700 font-medium">
                          <span className="flex items-center gap-1" title="Stars">
                            <Star className="h-3 w-3 text-amber-500 fill-amber-400/20" />
                            {repo.stargazers_count.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1" title="Forks">
                            <GitFork className="h-3 w-3 text-slate-400" />
                            {repo.forks_count.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* 5. GITHUB DOSSIER & COLLAPSE ACTIONS FOOTER */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={handleToggle}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-2xs cursor-pointer"
              >
                <ChevronUp className="h-3.5 w-3.5 text-slate-500" />
                <span>Collapse Profile</span>
              </button>

              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-950 px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                <span>View Full GitHub Dossier</span>
                <ExternalLink className="h-3.5 w-3.5 text-slate-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
