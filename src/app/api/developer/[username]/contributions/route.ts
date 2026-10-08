import { NextRequest, NextResponse } from 'next/server';
import { fetchUserContributions } from '@/lib/github';

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

    const contributions = await fetchUserContributions(username);
    return NextResponse.json({ username, contributions });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch contributions';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
