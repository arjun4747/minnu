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
} from 'lucide-react';

interface DeveloperCardProps {
  data: DeveloperCardData;
}

export default function DeveloperCard({ data }: DeveloperCardProps) {
  const { profile, activity, contributions, topRepos, totalStars } = data;
  const [copied, setCopied] = useState(false);

  const joinedYear = profile.created_at
    ? new Date(profile.created_at).getFullYear()
    : 'Unknown';

  const websiteUrl = profile.blog
    ? profile.blog.startsWith('http')
      ? profile.blog
      : `https://${profile.blog}`
    : null;

  const handleCopyProfile = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(profile.html_url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300">
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
              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
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
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition-all hover:bg-slate-100 hover:text-black"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-600" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>

            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noreferrer"
                title={`Portfolio: ${websiteUrl}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition-all hover:bg-slate-100 hover:text-black"
              >
                <Globe className="h-3.5 w-3.5" />
              </a>
            )}

            {profile.twitter_username && (
              <a
                href={`https://x.com/${profile.twitter_username}`}
                target="_blank"
                rel="noreferrer"
                title={`Twitter: @${profile.twitter_username}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition-all hover:bg-slate-100 hover:text-black"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            )}

            <a
              href={profile.html_url}
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

        {/* Profile Info Header */}
        <div className="mb-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <a
              href={profile.html_url}
              target="_blank"
              rel="noreferrer"
              className="group/name flex items-center gap-1.5 text-base font-bold text-slate-950 transition-colors hover:text-blue-600"
            >
              <span>{profile.name || profile.login}</span>
              <span className="text-xs font-mono font-normal text-slate-500">@{profile.login}</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover/name:opacity-100 text-blue-600" />
            </a>
            <LastActiveIndicator activity={activity} />
          </div>

          {profile.bio && (
            <p className="mt-2 line-clamp-2 text-xs text-slate-600 leading-relaxed font-sans">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Profile Stats Row */}
        <div className="mb-4 grid grid-cols-4 gap-2 rounded-xl border border-slate-200 bg-slate-50/70 p-2.5 text-center">
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
              <UserPlus className="h-3 w-3 text-slate-400" />
              Following
            </div>
            <div className="mt-1 text-xs font-bold text-slate-900 font-mono">
              {profile.following.toLocaleString()}
            </div>
          </div>
          <div className="rounded-lg py-1 px-1 border-l border-slate-200">
            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 uppercase font-mono tracking-wider">
              <Star className="h-3 w-3 text-amber-500" />
              Total Stars
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

        {/* Contribution Heatmap */}
        <div className="mb-4">
          <ContributionHeatmap contributions={contributions} />
        </div>

        {/* Top Repositories Row */}
        {topRepos.length > 0 && (
          <div>
            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-800">
              <div className="flex items-center gap-1.5">
                <FolderGit2 className="h-3.5 w-3.5 text-slate-500" />
                <span>Featured Repositories</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Top by stars</span>
            </div>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {topRepos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="group/repo flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-2.5 transition-all hover:border-slate-300 hover:bg-slate-100"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="truncate text-xs font-semibold text-blue-600 group-hover/repo:underline">
                        {repo.name}
                      </span>
                      <ExternalLink className="h-3 w-3 shrink-0 text-slate-400 opacity-0 group-hover/repo:opacity-100 transition-opacity" />
                    </div>
                    {repo.description && (
                      <p className="mt-1 line-clamp-2 text-[10px] text-slate-500 leading-normal">
                        {repo.description}
                      </p>
                    )}
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-200/60 pt-1.5">
                    {repo.language ? (
                      <span className="rounded-md bg-slate-200/80 px-1.5 py-0.5 text-[9px] font-mono font-medium text-slate-700">
                        {repo.language}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="flex items-center gap-1 text-slate-700 font-mono font-medium">
                      <Star className="h-3 w-3 text-amber-500 fill-amber-400/20" />
                      {repo.stargazers_count}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[10px] font-mono text-slate-400">ID: {profile.id}</span>
        <a
          href={profile.html_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors"
        >
          <span>View GitHub Dossier</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
