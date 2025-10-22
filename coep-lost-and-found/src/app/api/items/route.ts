import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Create a dummy user for testing if it doesn't exist
async function ensureDummyUser() {
  try {
    const dummyUser = await prisma.user.findFirst({
      where: { email: 'dummy@example.com' }
    });

    if (!dummyUser) {
      return await prisma.user.create({
        data: {
          name: 'Dummy User',
          email: 'dummy@example.com',
          role: 'USER'
        }
      });
    }

    return dummyUser;
  } catch (error) {
    console.error('Error in ensureDummyUser:', error);
    throw error;
  }
}

// Helper function to test database connection
async function testConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}

export async function GET() {
  try {
    const items = await prisma.item.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

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
    const { title, description, category, location, type, imageUrl } = body;
    
    if (!title || !description || !category || !location || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Test connection first with retry logic
    let connectionTest = await testConnection();
    if (!connectionTest) {
      // If connection fails, wait and retry once
      console.log('Database connection failed, retrying in 2 seconds...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      connectionTest = await testConnection();
      
      if (!connectionTest) {
        return NextResponse.json(
          { error: 'Database connection unavailable. Please try again in a moment.' },
          { status: 503 }
        );
      }
    }

    // Ensure we have a user to associate with the item
    const dummyUser = await ensureDummyUser();

    const newItem = await prisma.item.create({
      data: {
        title,
        description,
        category,
        location,
        type,
        imageUrl: imageUrl || null,
        authorId: dummyUser.id,
        status: 'UNCLAIMED',
        isApproved: false
      },
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error: any) {
    console.error('Error creating item:', error);
    
    // Provide more specific error messages
    if (error.code === 'P1001') {
      return NextResponse.json(
        { error: 'Database connection timeout. Please try again.' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create item. Please try again.' },
      { status: 500 }
    );
  }
}
