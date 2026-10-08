import { NextRequest, NextResponse } from 'next/server';
import { fetchUserActivityStatus } from '@/lib/github';

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

    const activityStatus = await fetchUserActivityStatus(username);
    return NextResponse.json({ username, activityStatus });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch activity status';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
