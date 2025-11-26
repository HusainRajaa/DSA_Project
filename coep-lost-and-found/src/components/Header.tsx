'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// --- ICONS (Scoped to this component) ---
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ height: '1.5rem', width: '1.5rem' }}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ height: '1.5rem', width: '1.5rem' }}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ height: '1.5rem', width: '1.5rem' }}>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

// --- HEADER COMPONENT ---
export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
                <div className="header-container">
                    <Link href="/" className="logo">COEP <span>Lost&Found</span></Link>
                    
                    <nav className="desktop-nav">
                        <Link href="/"><span>Home</span></Link>
                        <Link href="/found-items"><span>Found Items</span></Link>
                        <Link href="/lost-items"><span>Lost Items</span></Link>
                    </nav>
                    
                    <div className="header-actions desktop-nav">
                         <button><UserIcon /><span>Login</span></button>
                    </div>
                    
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="mobile-menu-button">
                      {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
                
                <div className={`mobile-nav-wrapper ${isMenuOpen ? 'open' : ''}`}>
                     <div className="mobile-nav">
                        <Link href="/" onClick={handleLinkClick}>Home</Link>
                        <Link href="/found-items" onClick={handleLinkClick}>Found Items</Link>
                        <Link href="/lost-items" onClick={handleLinkClick}>Lost Items</Link>
                        <button><UserIcon /><span>Login</span></button>
                    </div>
                </div>
            </header>
        </>
    );
};
