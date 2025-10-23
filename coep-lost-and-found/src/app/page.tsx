'use client';

import React, { useState, useEffect, useRef, RefObject } from 'react';
import Link from 'next/link';
import styles from './HomePage.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import ItemCard from '../components/ItemCard';
import ItemTypeToggle from '../components/ItemTypeToggle'; // <-- Import the new component

// --- ICONS ---
const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-icon">
        <style jsx>{`.arrow-icon { margin-left: 0.5rem; height: 1.25rem; width: 1.25rem; transition: transform 0.2s; } button:hover .arrow-icon { transform: translateX(4px); }`}</style>
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

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
const mockFoundItems: Item[] = [
    { id: 1, title: 'Bose QuietComfort Headphones', location: 'Library, 2nd Floor', category: 'Electronics', imageUrl: `https://placehold.co/600x400/1e293b/FFFFFF?text=Bose+Headphones`, date: 'Oct 17, 2025' },
    { id: 2, title: 'Student ID Card', location: 'Main Canteen', category: 'ID Card', imageUrl: `https://placehold.co/600x400/1e293b/FFFFFF?text=ID+Card`, date: 'Oct 16, 2025' },
    { id: 3, title: 'Black Nike Water Bottle', location: 'Boat Club Lawns', category: 'Accessories', imageUrl: `https://placehold.co/600x400/1e293b/FFFFFF?text=Water+Bottle`, date: 'Oct 15, 2025' },
];

const mockLostItems: Item[] = [
    { id: 4, title: 'iPhone 14 Pro', location: 'Near Main Auditorium', category: 'Electronics', imageUrl: `https://placehold.co/600x400/8b5cf6/FFFFFF?text=iPhone+14`, date: 'Oct 18, 2025' },
    { id: 5, title: 'Gray Jansport Backpack', location: 'Central Computer Lab', category: 'Bags', imageUrl: `https://placehold.co/600x400/8b5cf6/FFFFFF?text=Backpack`, date: 'Oct 17, 2025' },
    { id: 6, title: 'Keys on a Red Lanyard', location: 'Parking Lot C', category: 'Keys', imageUrl: `https://placehold.co/600x400/8b5cf6/FFFFFF?text=Keys`, date: 'Oct 16, 2025' },
];

// --- UTILITY HOOK for scroll animations ---
const useOnScreen = (options: IntersectionObserverInit): [RefObject<HTMLDivElement | null>, boolean] => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);
        
        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => { 
            if (currentRef) {
                observer.unobserve(currentRef);
            } 
        };
    }, [options]);

    return [ref, isVisible];
};

// --- PROP TYPES ---
interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
}
interface DsaCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay?: number;
}

// --- Reusable Components defined in this file ---
const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = '' }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    return (
        <div ref={ref} className={`${styles.animatedSection} ${isVisible ? styles.animatedSectionVisible : ''} ${className}`}>
            {children}
        </div>
    );
};

const DsaCard: React.FC<DsaCardProps> = ({ icon, title, description, delay = 0 }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.2 });
    return (
        <div ref={ref} className={`${styles.dsaCard} ${isVisible ? styles.dsaCardVisible : ''}`} style={{ transitionDelay: `${delay}ms` }}>
            <div className={styles.cardInner}>
                <div className={styles.dsaCardIcon}>{icon}</div>
                <h3 className={styles.dsaCardTitle}>{title}</h3>
                <p className={styles.dsaCardDescription}>{description}</p>
            </div>
        </div>
    );
}

// --- MAIN HOME PAGE COMPONENT ---
export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [itemType, setItemType] = useState<'found' | 'lost'>('found'); // <-- New state for item type
  const [filteredItems, setFilteredItems] = useState<Item[]>(mockFoundItems);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const sourceList = itemType === 'found' ? mockFoundItems : mockLostItems;

    const results = sourceList.filter(item =>
      item.title.toLowerCase().includes(lowercasedQuery) ||
      item.location.toLowerCase().includes(lowercasedQuery) ||
      item.category.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredItems(results);
  }, [searchQuery, itemType]); // <-- Re-run when itemType changes

  const [gridRef, isGridVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <div className={styles.pageContainer}>
      <Header />
      <main>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.animatedBackground}>
            <div className={`${styles.blob} ${styles.blob1}`}></div>
            <div className={`${styles.blob} ${styles.blob2}`}></div>
            <div className={`${styles.blob} ${styles.blob3}`}></div>
          </div>
          <div className={`${styles.container} ${styles.heroContent}`}>
            <AnimatedSection>
              <h1 className={styles.heroTitle}>Lost Something? <br /> <span>Find It With Ease.</span></h1>
              <p className={styles.heroSubtitle}>The official Lost & Found hub for the COEP campus. Report lost items, post what you've found, and help reunite belongings with their owners.</p>
              
              <SearchBar onSearch={setSearchQuery} />

              <div className={styles.heroActions}>
                <Link href="/report-found" passHref>
                  <button className={`${styles.button} ${styles.buttonPrimary}`}>
                    <span>I Found an Item<ArrowRightIcon /></span>
                  </button>
                </Link>
                <Link href="/report-lost" passHref>
                  <button className={`${styles.button} ${styles.buttonSecondary}`}>
                    I Lost an Item
                  </button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Recently Found/Lost Items Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <AnimatedSection className={styles.textCenter}>
                {/* Dynamically change the title */}
              <h2 className={styles.sectionTitle}>Recently {itemType === 'found' ? 'Found' : 'Lost'} Items</h2>
              <p className={styles.sectionSubtitle}>
                  {itemType === 'found' 
                    ? "Here are the latest items that have been turned in. Is one of them yours?"
                    : "Review the latest items reported missing by students on campus."
                  }
              </p>
            </AnimatedSection>

            {/* Add the toggle component here */}
            <ItemTypeToggle onToggle={setItemType} />
            
            <div ref={gridRef} className={styles.itemsGrid}>
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <ItemCard key={item.id} item={item} index={index} isVisible={isGridVisible} />
                ))
              ) : (
                <p className={styles.noResults}>No items found matching your criteria.</p>
              )}
            </div>
            
            <div className={styles.textCenter}>
              <button className={`${styles.button} ${styles.viewAllButton}`}>
                <span>View All Items<ArrowRightIcon /></span>
              </button>
            </div>
          </div>
        </section>
        
        {/* DSA Spotlight Section */}
        <section className={`${styles.section} ${styles.dsaSection}`}>
           <div className={styles.container}>
                <AnimatedSection className={styles.textCenter}>
                    <h2 className={styles.sectionTitle}>Powered by Smart Data Structures</h2>
                    <p className={styles.sectionSubtitle}>This isn't just a website; it's a smart system designed for efficiency and speed.</p>
                </AnimatedSection>
                <div className={styles.dsaGrid}>
                    <DsaCard icon={"🚀"} title="Trie" description="For lightning-fast, predictive search suggestions as you type." delay={0} />
                    <DsaCard icon={"🗂️"} title="HashMap" description="Instantly categorizes and filters items for quick browsing." delay={100} />
                    <DsaCard icon={"⏳"} title="Queue" description="Fairly processes new reports in chronological order for admin review." delay={200} />
                    <DsaCard icon={"🏆"} title="Max-Heap" description="Intelligently scores and suggests the most likely matches for your lost items." delay={300} />
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
