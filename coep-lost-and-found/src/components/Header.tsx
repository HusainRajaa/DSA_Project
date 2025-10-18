'use client';

import React, { useState, useEffect } from 'react';

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
            <header className={`header ${isScrolled ? 'headerScrolled' : ''}`}>
                <div className="container headerNav">
                    <a href="/" className="logo">COEP <span>Lost&Found</span></a>
                    
                    <nav className="desktopNav">
                        <a href="/"><span>Home</span></a>
                        <a href="/found-items"><span>Found Items</span></a>
                        <a href="/lost-items"><span>Lost Items</span></a>
                    </nav>
                    
                    <div className="headerActions desktopNav">
                         <button><UserIcon /><span>Login</span></button>
                    </div>
                    
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="mobileMenuButton">
                      {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
                
                <div className={`mobileNavWrapper ${isMenuOpen ? 'open' : ''}`}>
                     <div className="mobileNav">
                        <a href="/" onClick={handleLinkClick}>Home</a>
                        <a href="/found-items" onClick={handleLinkClick}>Found Items</a>
                        <a href="/lost-items" onClick={handleLinkClick}>Lost Items</a>
                        <button><UserIcon /><span>Login</span></button>
                    </div>
                </div>
            </header>

            <style jsx>{`
              .header {
                  position: fixed;
                  top: 0;
                  left: 0;
                  right: 0;
                  z-index: 50;
                  transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;
                  transform: translateY(-100%);
                  animation: slideDown 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards;
              }
              
              @keyframes slideDown {
                  to {
                    transform: translateY(0);
                  }
              }

              .headerScrolled {
                  background-color: rgba(15, 23, 42, 0.8);
                  backdrop-filter: blur(10px);
                  border-bottom: 1px solid #334155;
              }

              .container {
                  max-width: 1280px;
                  margin-left: auto;
                  margin-right: auto;
                  padding-left: 1.5rem;
                  padding-right: 1.5rem;
              }

              .headerNav {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding-top: 1rem;
                  padding-bottom: 1rem;
              }

              .logo {
                  font-size: 1.5rem;
                  font-weight: 700;
                  color: white;
                  text-decoration: none;
                  transition: transform 0.2s ease;
              }
              .logo:hover {
                  transform: scale(1.05);
              }
              .logo span {
                  color: #ef4444;
              }

              .desktopNav {
                  display: none;
              }
              .desktopNav a {
                  position: relative;
                  color: #d1d5db;
                  text-decoration: none;
                  transition: color 0.2s ease;
                  margin: 0 1rem;
                  padding: 0.5rem 0;
              }
              .desktopNav a::after {
                  content: '';
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  height: 2px;
                  background-color: #ef4444;
                  transform: scaleX(0);
                  transform-origin: bottom right;
                  transition: transform 0.3s cubic-bezier(0.65, 0.05, 0.36, 1);
              }
              .desktopNav a:hover {
                  color: white;
              }
              .desktopNav a:hover::after {
                  transform: scaleX(1);
                  transform-origin: bottom left;
              }
              
              .headerActions button {
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                  background-color: #1e293b;
                  color: white;
                  padding: 0.5rem 1rem;
                  border-radius: 0.5rem;
                  border: none;
                  cursor: pointer;
                  transition: all 0.2s ease;
              }
              .headerActions button:hover {
                  background-color: #334155;
                  transform: translateY(-2px);
                  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
              }

              .mobileMenuButton {
                  display: block;
                  background: none;
                  border: none;
                  color: white;
                  cursor: pointer;
                  z-index: 100;
                  transition: transform 0.2s ease;
              }
              .mobileMenuButton:hover {
                  transform: scale(1.1);
              }

              .mobileNavWrapper {
                  position: fixed;
                  top: 0;
                  left: 0;
                  right: 0;
                  height: 100vh;
                  background-color: rgba(15, 23, 42, 0.95);
                  backdrop-filter: blur(10px);
                  clip-path: circle(25px at calc(100% - 40px) 40px);
                  transition: clip-path 0.5s cubic-bezier(0.65, 0.05, 0.36, 1);
                  pointer-events: none;
              }
              .mobileNavWrapper.open {
                  clip-path: circle(150% at calc(100% - 40px) 40px);
                  pointer-events: auto;
              }

              .mobileNav {
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  gap: 2.5rem;
              }
              .mobileNav a {
                  color: #d1d5db;
                  text-decoration: none;
                  font-size: 1.5rem;
                  font-weight: 600;
                  opacity: 0;
                  transform: translateY(20px);
                  transition: opacity 0.3s ease, transform 0.3s ease;
              }
              .mobileNavWrapper.open .mobileNav a {
                  opacity: 1;
                  transform: translateY(0);
                  transition-delay: 0.3s;
              }

              .mobileNav button {
                  margin-top: 1rem;
                  background-color: #1e293b;
                  border: none;
                  padding: 0.75rem 1.5rem;
                  border-radius: 0.5rem;
                  color: white;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                  opacity: 0;
                  transform: translateY(20px);
                  transition: opacity 0.3s ease, transform 0.3s ease;
              }
              .mobileNavWrapper.open .mobileNav button {
                  opacity: 1;
                  transform: translateY(0);
                  transition-delay: 0.4s;
              }

              @media (min-width: 768px) {
                  .desktopNav { display: flex; align-items: center; }
                  .mobileMenuButton, .mobileNavWrapper { display: none; }
              }
            `}</style>
        </>
    );
};

