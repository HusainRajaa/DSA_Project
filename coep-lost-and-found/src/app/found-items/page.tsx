'use client';

import React, { useState, useEffect } from 'react';
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
const ItemCard: React.FC<{ item: FoundItem; index: number }> = ({ item, index }) => {
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

  return (
    <div className="item-card" style={{ transitionDelay: `${index * 100}ms` }}>
      <img src={getImageUrl()} alt={item.title} className="item-card-img" onError={(e) => ((e.target as HTMLImageElement).src = 'https://placehold.co/600x400/31343c/FFFFFF?text=Image+Not+Found')} />
      <div className="item-card-content">
        <div className="item-card-header">
          <h3 className="item-card-title">{item.title}</h3>
          <span className="item-card-category" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>{item.category}</span>
        </div>
        <p className="item-card-description">{item.description}</p>
        <p><strong>Found At:</strong> {item.location}</p>
        <p><strong>Contact:</strong> {item.contact}</p>
        <p><strong>Date Found:</strong> {formatDate(item.createdAt)}</p>
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
                <ItemCard key={item.id} item={item} index={index} />
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
      `}</style>
    </div>
  );
}
