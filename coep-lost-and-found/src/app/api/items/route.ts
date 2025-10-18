import { NextResponse } from 'next/server';

let items = [
  { id: 1, name: 'iPhone 13', description: 'Found near the library.', type: 'found' },
  { id: 2, name: 'MacBook Pro Charger', description: 'Lost in the electronics lab.', type: 'lost' },
  { id: 3, name: 'Water Bottle', description: 'Black steel bottle, found in the gym.', type: 'found' },
  { id: 4, name: 'Keys', description: 'Bunch of keys with a red keychain.', type: 'lost' },
];

export async function GET() {
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const newItem = await request.json();
  newItem.id = items.length + 1;
  items.push(newItem);
  return NextResponse.json(newItem, { status: 201 });
}
