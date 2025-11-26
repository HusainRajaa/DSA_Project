import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { itemId, message, contactEmail, contactName } = body;
    
    if (!itemId || !message || !contactEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: itemId, message, and contactEmail are required' },
        { status: 400 }
      );
    }

    // Find the item in either lostItem or foundItem collections
    let item = await prisma.lostItem.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      item = await prisma.foundItem.findUnique({
        where: { id: itemId },
      });
    }

    if (!item) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    // In a real application, you would:
    // 1. Send an email to the item owner with the contact information
    // 2. Store the contact request in the database
    // 3. Notify the user that their message was sent
    
    // For now, we'll return the contact information
    const contactRequest = {
      itemId,
      itemTitle: item.title,
      ownerEmail: item.contact, // Using the 'contact' field
      contactEmail,
      contactName: contactName || 'Anonymous',
      message,
      timestamp: new Date().toISOString()
    };

    // TODO: Implement email sending functionality
    console.log('Contact request received:', contactRequest);

    return NextResponse.json({
      success: true,
      message: 'Contact request sent successfully',
      data: {
        ownerEmail: item.contact, // Using the 'contact' field
        itemTitle: item.title
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error processing contact request:', error);
    return NextResponse.json(
      { error: 'Failed to process contact request' },
      { status: 500 }
    );
  }
}
