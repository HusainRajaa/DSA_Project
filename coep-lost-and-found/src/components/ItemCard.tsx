'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import styles from './ItemCard.module.css'; // We'll create this CSS file too

// --- SVG Icon ---
const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.arrowIcon}>
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);


// --- Type Definition ---
interface Item {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  imageUrl: string | null;
  type: 'LOST' | 'FOUND';
  status: 'UNCLAIMED' | 'CLAIMED';
  createdAt: string;
  author: {
    name: string | null;
    email: string | null;
  };
}

// --- Component Props ---
interface ItemCardProps {
  item: Item;
  index: number; // For the animation delay
  isVisible: boolean; // To trigger the animation
  onContactOwner?: (itemId: string) => void;
}

// --- ItemCard Component ---
const ItemCard: React.FC<ItemCardProps> = ({ item, index, isVisible, onContactOwner }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${y * -10}deg) rotateY(${x * 10}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const handleContactOwner = () => {
    if (onContactOwner) {
      onContactOwner(item.id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getImageUrl = () => {
    return item.imageUrl || 'https://placehold.co/600x400/31343c/FFFFFF?text=No+Image';
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.itemCard} ${isVisible ? styles.itemCardVisible : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.cardInner}>
        <div className={styles.imageContainer}>
          <Image src={getImageUrl()} alt={item.title} width={600} height={400} />
        </div>
        <div className={styles.itemCardContent}>
          <div className={styles.itemCardHeader}>
            <h3 className={styles.itemCardTitle}>{item.title}</h3>
            <div className={styles.itemCardMeta}>
              <span className={`${styles.itemCardType} ${item.type === 'LOST' ? styles.lost : styles.found}`}>
                {item.type}
              </span>
              <span className={styles.itemCardCategory}>{item.category}</span>
            </div>
          </div>
          <p className={styles.itemCardDescription}>{item.description}</p>
          <p className={styles.itemCardInfo}><strong>Location:</strong> {item.location}</p>
          <p className={styles.itemCardInfo} style={{ fontSize: '0.875rem' }}><strong>Reported:</strong> {formatDate(item.createdAt)}</p>
          <p className={styles.itemCardInfo} style={{ fontSize: '0.875rem' }}><strong>Status:</strong> {item.status}</p>
          <div className={styles.itemCardActions}>
            <button className={styles.itemCardButton} onClick={handleContactOwner}>
              <span>Contact Owner</span>
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
