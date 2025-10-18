'use client';

import React from 'react';
import styles from './SearchBar.module.css'; // We'll create this CSS file next

// --- SVG Icon ---
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ height: '1.25rem', width: '1.25rem', color: '#9ca3af' }}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

// --- Component Props ---
interface SearchBarProps {
  onSearch: (query: string) => void;
}

// --- SearchBar Component ---
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div className={styles.searchBarWrapper}>
      <input
        type="text"
        placeholder="Search for an item by name, category, or location..."
        className={styles.searchInput}
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
    </div>
  );
};

export default SearchBar;
