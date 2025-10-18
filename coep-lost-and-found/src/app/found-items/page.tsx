'use client';

import React from 'react';
import Link from 'next/link';


// --- TYPE DEFINITIONS ---
interface Item {
    id: number;
    title: string;
    location: string;
    category: string;
    imageUrl: string;
    date: string;
}

// --- MOCK DATA ---
const allFoundItems: Item[] = [
    { id: 1, title: 'Bose QuietComfort Headphones', location: 'Library, 2nd Floor', category: 'Electronics', imageUrl: `https://placehold.co/600x400/1e293b/FFFFFF?text=Bose+Headphones`, date: 'Oct 17, 2025' },
    { id: 2, title: 'Student ID Card', location: 'Main Canteen', category: 'ID Card', imageUrl: `https://placehold.co/600x400/1e293b/FFFFFF?text=ID+Card`, date: 'Oct 16, 2025' },
    { id: 3, title: 'Black Nike Water Bottle', location: 'Boat Club Lawns', category: 'Accessories', imageUrl: `https://placehold.co/600x400/1e293b/FFFFFF?text=Water+Bottle`, date: 'Oct 15, 2025' },
    { id: 7, title: 'Blue Umbrella', location: 'Entrance Gate', category: 'Accessories', imageUrl: `https://placehold.co/600x400/1e293b/FFFFFF?text=Umbrella`, date: 'Oct 14, 2025' },
    { id: 8, title: 'Physics Textbook', location: 'Reading Hall', category: 'Books', imageUrl: `https://placehold.co/600x400/1e293b/FFFFFF?text=Textbook`, date: 'Oct 13, 2025' },
];



// ItemCard Component
const ItemCard: React.FC<{ item: Item; index: number; isVisible: boolean }> = ({ item, index, isVisible }) => {
    // Note: The 3D hover and advanced animations can be re-added here if needed.
    // This is a simplified version for stability.
    return (
        <div className={`item-card ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 100}ms` }}>
            <img src={item.imageUrl} alt={item.title} className="item-card-img" onError={(e) => ((e.target as HTMLImageElement).src = 'https://placehold.co/600x400/31343c/FFFFFF?text=Image+Not+Found')} />
            <div className="item-card-content">
                <div className="item-card-header">
                    <h3 className="item-card-title">{item.title}</h3>
                    <span className="item-card-category">{item.category}</span>
                </div>
                <p><strong>Last Seen:</strong> {item.location}</p>
                <p><strong>Date Found:</strong> {item.date}</p>
                <button className="item-card-button">View Details</button>
            </div>
        </div>
    );
};


// --- MAIN PAGE COMPONENT ---
export default function FoundItemsPage() {
    return (
        <>
            <div className="page-container">
                <main className="main-content">
                    <div className="container">
                        <h1 className="page-title">All Found Items</h1>
                        <p className="page-subtitle">
                            Browse the complete list of items that have been turned in. If you see something that belongs to you, click "View Details" to start the claim process.
                        </p>
                        <div className="items-grid">
                            {allFoundItems.map((item, index) => (
                                <ItemCard key={item.id} item={item} index={index} isVisible={true} />
                            ))}
                        </div>
                    </div>
                </main>
            </div>

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

                /* Header Styles */
                .header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    background: rgba(12, 17, 29, 0.8);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    z-index: 50;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                .header-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 1rem 1.5rem;
                }
                .logo {
                    font-weight: 700;
                    font-size: 1.25rem;
                    color: #fff;
                    text-decoration: none;
                }
                .nav-links {
                    display: flex;
                    gap: 2rem;
                }
                .nav-links a {
                    color: #9ca3af;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                .nav-links a:hover {
                    color: #fff;
                }
                .login-button {
                    background-color: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: #fff;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                .login-button:hover {
                    background-color: rgba(255, 255, 255, 0.2);
                }

                /* Footer Styles */
                .footer {
                    background: #0c111d;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    text-align: center;
                    padding: 2rem 1.5rem;
                    color: #9ca3af;
                    font-size: 0.875rem;
                }
                .footer p {
                    margin: 0.25rem 0;
                }

                /* Item Card Styles */
                .item-card {
                    background-color: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 1rem;
                    overflow: hidden;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    opacity: 0;
                    transform: translateY(20px);
                }
                .item-card.visible {
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
                    background-color: rgba(59, 130, 246, 0.2);
                    color: #60a5fa;
                    padding: 0.25rem 0.75rem;
                    border-radius: 9999px;
                    font-size: 0.75rem;
                    font-weight: 500;
                }
                .item-card-content p {
                    margin: 0.5rem 0;
                    color: #9ca3af;
                    font-size: 0.875rem;
                }
                .item-card-button {
                    width: 100%;
                    margin-top: 1rem;
                    background-color: #3b82f6;
                    color: white;
                    border: none;
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                .item-card-button:hover {
                    background-color: #2563eb;
                }
            `}</style>
        </>
    );
}

