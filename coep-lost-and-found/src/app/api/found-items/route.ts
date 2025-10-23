import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const foundItems = await db.collection('foundItems').find({}).sort({ createdAt: -1 }).toArray();
    
    // Convert MongoDB _id to id for frontend compatibility
    const formattedItems = foundItems.map(item => ({
      id: item._id.toString(),
      title: item.title,
      description: item.description,
      category: item.category,
      location: item.location,
      contact: item.contact,
      imageUrl: item.imageUrl,
      createdAt: item.createdAt
    }));
    
    return NextResponse.json(formattedItems);
  } catch (error) {
    console.error('Error fetching found items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch found items' },
      { status: 500 }
    );
  }
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

    const client = await clientPromise;
    const db = client.db();
    
    const newFoundItem = {
      title,
      description,
      category,
      location,
      contact,
      imageUrl: imageUrl || null,
      createdAt: new Date()
    };

    const result = await db.collection('foundItems').insertOne(newFoundItem);
    
    const createdItem = {
      id: result.insertedId.toString(),
      ...newFoundItem,
      createdAt: newFoundItem.createdAt.toISOString()
    };

    return NextResponse.json(createdItem, { status: 201 });
  } catch (error) {
    console.error('Error creating found item:', error);
    return NextResponse.json(
      { error: 'Failed to create found item' },
      { status: 500 }
    );
  }
}
