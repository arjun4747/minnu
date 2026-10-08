import { NextRequest, NextResponse } from 'next/server';
import { searchDevelopers } from '@/lib/github';
import { SearchFilterParams } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const username = searchParams.get('username') || undefined;
    const language = searchParams.get('language') || undefined;
    const location = searchParams.get('location') || undefined;
    const minFollowersStr = searchParams.get('minFollowers');
    const minReposStr = searchParams.get('minRepos');
    const sortRaw = searchParams.get('sort') || 'best_match';
    const pageStr = searchParams.get('page');

    const minFollowers = minFollowersStr ? parseInt(minFollowersStr, 10) : 0;
    const minRepos = minReposStr ? parseInt(minReposStr, 10) : 0;
    const page = pageStr ? parseInt(pageStr, 10) : 1;

    let sort: SearchFilterParams['sort'] = 'best_match';
    if (sortRaw === 'followers' || sortRaw === 'repositories' || sortRaw === 'recently_active') {
      sort = sortRaw;
    }

    const filters: SearchFilterParams = {
      username: username ? username.trim() : undefined,
      language,
      location,
      minFollowers: isNaN(minFollowers) ? 0 : minFollowers,
      minRepos: isNaN(minRepos) ? 0 : minRepos,
      sort,
      page: isNaN(page) ? 1 : page,
    };

    const result = await searchDevelopers(filters);

    if (result.error && (!result.developers || result.developers.length === 0)) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      {
        total_count: 0,
        incomplete_results: false,
        developers: [],
        error: message,
      },
      { status: 500 }
    );
  }
}
