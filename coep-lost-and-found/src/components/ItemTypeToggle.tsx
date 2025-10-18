'use client';

import React, { useState } from 'react';

interface ItemTypeToggleProps {
    // This function will be called with 'found' or 'lost' when a button is clicked
    onToggle: (itemType: 'found' | 'lost') => void;
}

const ItemTypeToggle: React.FC<ItemTypeToggleProps> = ({ onToggle }) => {
    const [activeType, setActiveType] = useState<'found' | 'lost'>('found');

    const handleToggle = (type: 'found' | 'lost') => {
        setActiveType(type);
        onToggle(type);
    };

    return (
        <>
            <div className="toggleContainer">
                <button
                    className={`toggleButton ${activeType === 'found' ? 'active' : ''}`}
                    onClick={() => handleToggle('found')}
                >
                    Found Items
                </button>
                <button
                    className={`toggleButton ${activeType === 'lost' ? 'active' : ''}`}
                    onClick={() => handleToggle('lost')}
                >
                    Lost Items
                </button>
            </div>
            {/* Styles are now embedded inside the component to prevent resolution errors */}
            <style jsx>{`
                .toggleContainer {
                    display: flex;
                    justify-content: center;
                    background-color: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 9999px;
                    padding: 0.5rem;
                    margin-bottom: 2.5rem;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    width: fit-content;
                    margin-left: auto;
                    margin-right: auto;
                }
                .toggleButton {
                    background-color: transparent;
                    border: none;
                    color: #9ca3af;
                    padding: 0.75rem 1.5rem;
                    border-radius: 9999px;
                    font-size: 1rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    outline: none;
                }
                .toggleButton.active {
                    background-color: #3b82f6;
                    color: #ffffff;
                    box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
                }
                .toggleButton:not(.active):hover {
                    color: #e5e7eb;
                }
            `}</style>
        </>
    );
};

export default ItemTypeToggle;

