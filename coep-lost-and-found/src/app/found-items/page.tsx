'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- TYPE DEFINITIONS ---
interface FoundItem {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  contact: string;
  imageUrl: string | null;
  createdAt: string;
}

// ItemCard Component
const ItemCard: React.FC<{ item: FoundItem; index: number; onDelete: (id: string) => void }> = ({ item, index, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getImageUrl = () => {
    return item.imageUrl || 'https://placehold.co/600x400/10b981/FFFFFF?text=No+Image';
  };

  const handleMarkAsFound = async () => {
    if (confirm('Are you sure you want to mark this item as found? This will remove it from the list.')) {
      try {
        const response = await fetch(`/api/found-items?id=${item.id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          onDelete(item.id);
        } else {
          alert('Failed to mark item as found. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Error marking item as found. Please try again.');
      }
    }
  };

  return (
    <div className="item-card" style={{ transitionDelay: `${index * 100}ms` }}>
      <Image src={getImageUrl()} alt={item.title} className="item-card-img" width={600} height={400} />
      <div className="item-card-content">
        <div className="item-card-header">
          <h3 className="item-card-title">{item.title}</h3>
          <span className="item-card-category" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>{item.category}</span>
        </div>
        <p className="item-card-description">{item.description}</p>
        <p><strong>Found At:</strong> {item.location}</p>
        <p><strong>Contact:</strong> {item.contact}</p>
        <p><strong>Date Found:</strong> {formatDate(item.createdAt)}</p>
        <button 
          className="mark-found-button"
          onClick={handleMarkAsFound}
        >
          Mark as Found
        </button>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function FoundItemsPage() {
  const [foundItems, setFoundItems] = useState<FoundItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const response = await fetch('/api/found-items');
        if (response.ok) {
          const data = await response.json();
          setFoundItems(data);
        }
      } catch (error) {
        console.error('Error fetching found items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoundItems();
  }, []);

  const handleDeleteItem = (id: string) => {
    setFoundItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        <div className="container">
          <h1 className="page-title">All Found Items</h1>
          <p className="page-subtitle">
            Review items found by students. If you think one of these items belongs to you, please contact the finder.
          </p>
          
          {loading ? (
            <div className="loading">Loading found items...</div>
          ) : foundItems.length === 0 ? (
            <div className="no-items">No found items reported yet.</div>
          ) : (
            <div className="items-grid">
              {foundItems.map((item, index) => (
                <ItemCard key={item.id} item={item} index={index} onDelete={handleDeleteItem} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* EMBEDDED STYLES TO PREVENT IMPORT ERRORS */}
      <style jsx global>{`
        /* General Page Styles */
        .page-container {
          background-color: #0c111d;
          color: #e5e7eb;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .main-content {
          flex: 1;
          padding: 8rem 1.5rem 4rem;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }
        .page-subtitle {
          font-size: 1.125rem;
          text-align: center;
          color: #9ca3af;
          max-width: 700px;
          margin: 0 auto 3rem;
        }
        .items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        .loading, .no-items {
          text-align: center;
          color: #9ca3af;
          font-size: 1.125rem;
          margin: 2rem 0;
        }

        /* Item Card Styles */
        .item-card {
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          opacity: 1;
          transform: translateY(0);
        }
        .item-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        .item-card-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .item-card-content {
          padding: 1.25rem;
        }
        .item-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }
        .item-card-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #fff;
          margin: 0;
        }
        .item-card-category {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        .item-card-description {
          margin: 0.5rem 0;
          color: #9ca3af;
          font-size: 0.875rem;
          line-height: 1.4;
        }
        .item-card-content p {
          margin: 0.5rem 0;
          color: #9ca3af;
          font-size: 0.875rem;
        }

        /* Mark as Found Button */
        .mark-found-button {
          background-color: #10b981;
          color: white;
          border: none;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
          margin-top: 1rem;
          width: 100%;
        }
        .mark-found-button:hover {
          background-color: #059669;
        }
        .mark-found-button:active {
          background-color: #047857;
        }
      `}</style>
    </div>
  );
}
