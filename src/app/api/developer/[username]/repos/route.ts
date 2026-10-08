import { NextRequest, NextResponse } from 'next/server';
import { fetchUserRepos } from '@/lib/github';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    if (!username) {
      return NextResponse.json(
        { error: 'Username parameter is required' },
        { status: 400 }
      );
    }

    const repos = await fetchUserRepos(username);
    const sorted = [...repos].sort(
      (a, b) => b.stargazers_count - a.stargazers_count
    );
    const topRepos = sorted.slice(0, 10).map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      language: r.language,
      stargazers_count: r.stargazers_count,
      forks_count: r.forks_count,
      html_url: r.html_url,
    }));

    return NextResponse.json({ username, repositories: topRepos });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch repos';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
