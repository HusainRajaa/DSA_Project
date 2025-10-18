'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReportLostPage() {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      name: itemName,
      description: `${description} (Contact: ${contact})`,
      type: 'lost',
    };

    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        router.push('/');
      } else {
        console.error('Failed to submit report');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-2">Report a Lost Item</h1>
        <p className="text-lg text-[var(--secondary-text)]">Fill out the form below to report a lost item.</p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-[var(--card-background)] p-8 rounded-xl shadow-lg">
        <div className="mb-6">
          <label htmlFor="itemName" className="block text-lg font-medium mb-2">
            Item Name
          </label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-lg font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full"
            rows={4}
            required
          />
        </div>
        <div className="mb-8">
          <label htmlFor="contact" className="block text-lg font-medium mb-2">
            Contact Information
          </label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[var(--accent-color)] hover:bg-blue-500 text-white"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}
