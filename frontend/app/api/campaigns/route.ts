import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log("Fetching campaigns from backend");
    const response = await fetch('http://backend:8000/api/campaigns', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error response: ${response.status} - ${errorText}`);
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log(`Retrieved ${data.length} campaigns`);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Creating campaign:", body.name);
    
    // Ensure name is lowercase with no spaces (MindsDB requirement)
    body.name = body.name.toLowerCase().replace(/\s+/g, '_');
    
    const response = await fetch('http://backend:8000/api/campaigns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error response: ${response.status} - ${errorText}`);
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Campaign created successfully:", data.id);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating campaign:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to create campaign' 
    }, { status: 500 });
  }
} 