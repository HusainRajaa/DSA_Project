import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const lostItems = await prisma.lostItem.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    const foundItems = await prisma.foundItem.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    const items = [...lostItems.map(item => ({ ...item, type: 'lost' })), ...foundItems.map(item => ({ ...item, type: 'found' }))];
    items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { title, description, category, location, contact, type, imageUrl } = body;
    
    if (!title || !description || !category || !location || !contact || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const itemData = {
      title,
      description,
      category,
      location,
      contact,
      imageUrl: imageUrl || null,
    };

    let newItem;
    if (type === 'lost') {
      newItem = await prisma.lostItem.create({
        data: itemData,
      });
    } else if (type === 'found') {
      newItem = await prisma.foundItem.create({
        data: itemData,
      });
    } else {
      return NextResponse.json({ error: 'Invalid item type' }, { status: 400 });
    }

    return NextResponse.json(newItem, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating item:', error);
    
    return NextResponse.json(
      { error: 'Failed to create item. Please try again.' },
      { status: 500 }
    );
  }
}
