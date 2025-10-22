import { NextResponse } from 'next/server';

// Simple in-memory storage for found items
let foundItems: any[] = [];

export async function GET() {
  return NextResponse.json(foundItems);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { title, description, category, location, contact, imageUrl } = body;
    
    if (!title || !description || !category || !location || !contact) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newFoundItem = {
      id: Date.now().toString(),
      title,
      description,
      category,
      location,
      contact,
      imageUrl: imageUrl || null,
      createdAt: new Date().toISOString()
    };

    foundItems.push(newFoundItem);

    return NextResponse.json(newFoundItem, { status: 201 });
  } catch (error) {
    console.error('Error creating found item:', error);
    return NextResponse.json(
      { error: 'Failed to create found item' },
      { status: 500 }
    );
  }
}
