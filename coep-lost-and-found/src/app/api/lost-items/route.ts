import { NextResponse } from 'next/server';

// Simple in-memory storage for lost items
let lostItems: any[] = [];

export async function GET() {
  return NextResponse.json(lostItems);
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

    const newLostItem = {
      id: Date.now().toString(),
      title,
      description,
      category,
      location,
      contact,
      imageUrl: imageUrl || null,
      createdAt: new Date().toISOString()
    };

    lostItems.push(newLostItem);

    return NextResponse.json(newLostItem, { status: 201 });
  } catch (error) {
    console.error('Error creating lost item:', error);
    return NextResponse.json(
      { error: 'Failed to create lost item' },
      { status: 500 }
    );
  }
}
