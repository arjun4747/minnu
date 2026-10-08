export interface GitHubUserSearchItem {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  type: string;
  site_admin: boolean;
  score?: number;
}

export interface GitHubUserProfile {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  pushed_at: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // 0: none, 1: low, 2: med, 3: high, 4: very high
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface ContributionData {
  totalContributions: number;
  weeks: ContributionWeek[];
  months: { name: string; firstWeekIndex: number }[];
}

export type ActivityLevel = 'Highly Active' | 'Active' | 'Low Activity';

export interface ActivityStatus {
  level: ActivityLevel;
  lastActiveDaysAgo: number;
  lastActiveDate: string | null;
  isRecentlyActive: boolean; // active within 7 days
}

export interface DeveloperCardData {
  profile: GitHubUserProfile;
  activity: ActivityStatus;
  contributions: ContributionData;
  topRepos: GitHubRepository[];
  totalStars: number;
}

export interface SearchFilterParams {
  username?: string;
  language?: string;
  location?: string;
  minFollowers?: number;
  minRepos?: number;
  sort?: 'best_match' | 'followers' | 'repositories' | 'recently_active';
  page?: number;
  perPage?: number;
}

export interface DeveloperSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  developers: DeveloperCardData[];
  error?: string;
}
