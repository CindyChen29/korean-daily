import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 });
  }

  const apiKey = process.env.BING_API_KEY;
  const endpoint = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(q)}`;

  const response = await fetch(endpoint, {
    headers: {
      'Ocp-Apim-Subscription-Key': apiKey as string,
    },
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
  }

  const data = await response.json();
  return NextResponse.json(data);
} 