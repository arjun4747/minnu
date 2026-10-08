# GitHire — Technical Project Documentation

> **Real-time GitHub Developer Intelligence & Sourcing Engine**  
> *"Cracked engineers are not on LinkedIn"*

---

## 1. Executive Summary

**GitHire** is a modern, high-velocity technical recruiting platform designed to replace stale, self-reported resumes with live GitHub data. By connecting directly to GitHub’s REST and GraphQL APIs, GitHire enables recruiters and engineering managers to evaluate developers based on authentic commit frequencies, live GraphQL contribution heatmaps, repository star metrics, and verified open-source contributions.

---

## 2. Key Features

- **Live Candidate Search Station**:
  - Direct `@username` exact-match lookup with intelligent profile hydration.
  - Multi-dimensional filtering by programming stack (TypeScript, Rust, Python, Go, etc.), location, minimum follower count, and public repository counts.
  - Priority sorting by Best Match, Follower Count, Total Stars, and Commit Velocity.

- **GraphQL Contribution Heatmaps**:
  - Interactive 30-week GitHub activity calendar displaying real daily contribution frequencies.
  - Authentic GitHub emerald green tiers (`#ebedf0`, `#9be9a8`, `#40c463`, `#30a14e`, `#216e39`).
  - Active-day streaks and yearly contribution counters.

- **Commit Velocity & Dossier Analysis**:
  - Automated activity classification: **High Velocity** (active in the last 7 days), **Active**, or **Dormant**.
  - Direct repository inspect cards showcasing star counts, fork counts, public badges, and language distribution.

- **Clerk Authentication**:
  - Zero-friction authentication using `@clerk/nextjs`.
  - Supports email verification, Google OAuth, and GitHub OAuth.
  - Dedicated sign-in and sign-up modal/page flows with customizable `<UserButton />` profile management.
  - Phone number prompts disabled for a streamlined 1-click onboarding experience.

- **High-End Editorial Aesthetics**:
  - Typography powered by **Instrument Serif** and **Plus Jakarta Sans**.
  - Clean light-mode palette with forest green accents (`#14532d`), floating contribution heatmap widgets, and responsive layouts.

- **Resilient Fallback Engine**:
  - Built-in 3.5-second timeout guards (`AbortSignal.timeout`) to prevent network hangs.
  - Automatic fallback candidate curation when unauthenticated rate limits (60 req/hr) or network timeouts occur.

---

## 3. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 16 (App Router + Turbopack) | High-performance React server components and client routing |
| **Language** | TypeScript 5 | Strict type safety for GitHub API models and candidate schemas |
| **Styling** | Tailwind CSS v4 & Vanilla CSS Tokens | Flexible design system with custom utility tokens |
| **Typography** | Instrument Serif & Plus Jakarta Sans | High-end modern editorial aesthetics |
| **Authentication** | Clerk (`@clerk/nextjs` v6) | User authentication, session management, and profile controls |
| **Icons** | Lucide React | Minimalist UI iconography and brand marks |
| **Data Source** | GitHub REST API v3 & GraphQL API v4 | Real-time candidate sourcing and contribution graphs |

---

## 4. Architecture & Directory Structure

```
githire/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── search-developers/
│   │   │       └── route.ts            # Next.js API Route for candidate search & hydration
│   │   ├── globals.css                 # Global CSS tokens, heatmaps & Instrument Serif
│   │   ├── layout.tsx                  # Root layout wrapped with ClerkProvider & top banner
│   │   ├── page.tsx                    # Landing hero page with floating heatmaps & showcase
│   │   ├── search/
│   │   │   └── page.tsx                # Candidate filter station and dossier grid
│   │   ├── sign-in/
│   │   │   └── [[...sign-in]]/page.tsx # Clerk Sign-In route
│   │   └── sign-up/
│   │       └── [[...sign-up]]/page.tsx # Clerk Sign-Up route
│   ├── components/
│   │   ├── ActivityBadge.tsx           # Velocity indicator (High Velocity, Active, Dormant)
│   │   ├── ContributionHeatmap.tsx     # 30-week GitHub GraphQL contribution calendar
│   │   ├── DeveloperCard.tsx           # Candidate dossier card with avatar, bio & repos
│   │   ├── DeveloperCardSkeleton.tsx   # Light-mode loading shimmer skeleton
│   │   ├── Footer.tsx                  # Clean footer with GitHire branding
│   │   ├── Navbar.tsx                  # Brand header with Clerk auth buttons & dashboard link
│   │   └── SearchFilterForm.tsx        # Multi-attribute filter station with presets
│   ├── lib/
│   │   ├── github.ts                   # GitHub REST/GraphQL queries, timeouts & fallbacks
│   │   └── types.ts                    # TypeScript types for profiles, repos & heatmaps
│   └── middleware.ts                   # Clerk middleware with Next.js auto-proxy matchers
├── .env.local                          # Environment secrets (GITHUB_TOKEN, CLERK keys)
├── next.config.ts                      # Image optimization remote patterns (github.com)
├── package.json                        # Project dependencies and npm scripts
├── tsconfig.json                       # TypeScript compiler configuration
└── README.md                           # Quickstart guide
```

---

## 5. Environment Configuration

Create a `.env.local` file in the project root:

```env
# GitHub Personal Access Token (Unlocks 5,000 requests/hr and GraphQL queries)
GITHUB_TOKEN=ghp_your_personal_access_token_here

# Clerk Authentication Keys (From https://dashboard.clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
CLERK_SECRET_KEY=sk_test_your_secret_key

# Clerk Routing
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### Obtaining a Free GitHub Token
1. Go to [GitHub Token Settings](https://github.com/settings/tokens).
2. Click **Generate new token** &rarr; **Generate new token (classic)**.
3. Label it `githire` and select read-only public access (`read:user`, `public_repo`).
4. Copy the generated token starting with `ghp_...` and paste it into `.env.local`.

---

## 6. Installation & Local Development

### Prerequisites
- Node.js 18.18+ or 20+
- npm, pnpm, yarn, or bun

### Step-by-Step Setup
```bash
# 1. Clone repository or open project folder
cd c:/project/githire

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Visit **http://localhost:3000** in your browser to explore:
- **Landing Page**: [http://localhost:3000](http://localhost:3000)
- **Candidate Search Station**: [http://localhost:3000/search](http://localhost:3000/search)
- **Sign In**: [http://localhost:3000/sign-in](http://localhost:3000/sign-in)
- **Sign Up**: [http://localhost:3000/sign-up](http://localhost:3000/sign-up)

---

## 7. API Reference

### `GET /api/search-developers`

Queries live GitHub developers and hydrates complete dossiers.

#### Query Parameters:
| Parameter | Type | Default | Description |
|---|---|---|---|
| `username` | `string` | `undefined` | Exact or prefix GitHub login handle (e.g. `torvalds`, `shadcn`) |
| `language` | `string` | `undefined` | Primary programming language (e.g. `TypeScript`, `Rust`, `Python`) |
| `location` | `string` | `undefined` | Geographic filter (e.g. `San Francisco`, `Remote`, `Berlin`) |
| `minFollowers` | `number` | `0` | Minimum follower count threshold |
| `minRepos` | `number` | `0` | Minimum public repository count threshold |
| `sort` | `string` | `best_match` | Sort order: `best_match`, `followers`, `repositories`, `recently_active` |
| `page` | `number` | `1` | Pagination page number |

#### Example Response:
```json
{
  "total_count": 1,
  "incomplete_results": false,
  "developers": [
    {
      "profile": {
        "login": "torvalds",
        "id": 1024025,
        "avatar_url": "https://avatars.githubusercontent.com/u/1024025?v=4",
        "html_url": "https://github.com/torvalds",
        "name": "Linus Torvalds",
        "location": "Portland, OR",
        "bio": "Creator of Linux and Git.",
        "followers": 230000,
        "public_repos": 7,
        "created_at": "2011-09-03T15:26:22Z"
      },
      "activity": {
        "level": "Highly Active",
        "lastActiveDaysAgo": 0,
        "isRecentlyActive": true
      },
      "contributions": {
        "totalContributions": 3410,
        "weeks": [...],
        "months": [...]
      },
      "topRepos": [
        {
          "name": "linux",
          "stargazers_count": 182000,
          "language": "C"
        }
      ],
      "totalStars": 182000
    }
  ]
}
```

---

## 8. Deployment

### Deploying on Vercel
1. Push this repository to GitHub or GitLab.
2. Import the project into [Vercel](https://vercel.com/new).
3. Under **Environment Variables**, add:
   - `GITHUB_TOKEN`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
   - `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
4. Click **Deploy**. Vercel will automatically build the Next.js production bundle.

---

## 9. License & Credits

- **License**: MIT
- **Created for**: High-velocity technical recruiting teams.
- **Inspiration**: Modern engineering discovery tools and authentic open-source intelligence.
