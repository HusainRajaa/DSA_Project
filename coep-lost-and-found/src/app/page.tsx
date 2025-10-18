'use client';

import { useEffect, useState } from 'react';

interface Item {
  id: number;
  name: string;
  description: string;
  type: 'found' | 'lost';
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/items');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-2">Lost & Found Items</h1>
        <p className="text-lg text-[var(--secondary-text)]">Browse and report lost or found items on campus.</p>
      </div>
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search for items by name or description..."
          className="w-full max-w-2xl mx-auto block"
        />
      </div>
      {loading ? (
        <p className="text-center text-lg text-[var(--secondary-text)]">Loading items...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="bg-[var(--card-background)] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
              <p className="text-[var(--secondary-text)] mb-4">{item.description}</p>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  item.type === 'found' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                }`}
              >
                {item.type === 'found' ? 'Found' : 'Lost'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
