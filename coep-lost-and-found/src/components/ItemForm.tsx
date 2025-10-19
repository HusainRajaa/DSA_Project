'use client';

import React, { useState } from 'react';
import styles from './ItemForm.module.css';

// --- TYPE DEFINITIONS ---
interface ItemFormProps {
    formType: 'Lost' | 'Found';
}

// --- ICONS ---
const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.arrowIcon}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);


// --- ITEM FORM COMPONENT ---
export default function ItemForm({ formType }: ItemFormProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    return (
        <form className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="title">Item Title</label>
                <input type="text" id="title" name="title" placeholder="e.g., Black Nike Water Bottle" required />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" placeholder="Provide details like color, brand, or any identifying marks." rows={4} required></textarea>
            </div>
            
            <div className={styles.grid}>
                <div className={styles.formGroup}>
                    <label htmlFor="category">Category</label>
                    <select id="category" name="category" required>
                        <option value="">Select a category</option>
                        <option value="electronics">Electronics</option>
                        <option value="id-card">ID Card / Documents</option>
                        <option value="accessories">Accessories</option>
                        <option value="apparel">Apparel</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="location">Last Known Location</label>
                    <input type="text" id="location" name="location" placeholder="e.g., Library, 2nd Floor" required />
                </div>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="image-upload">Upload an Image (Optional)</label>
                <div 
                    className={styles.dropZone}
                    onClick={() => document.getElementById('image-upload')?.click()}
                >
                    <input type="file" id="image-upload" name="image" accept="image/*" onChange={handleImageChange} />
                    {imagePreview ? (
                        <img src={imagePreview} alt="Image preview" className={styles.imagePreview} />
                    ) : (
                        <div className={styles.uploadPrompt}>
                            <UploadIcon />
                            <p><span>Click to upload</span> or drag and drop</p>
                            <p className={styles.uploadHint}>PNG, JPG, GIF up to 10MB</p>
                        </div>
                    )}
                </div>
            </div>
            
            <button type="submit" className={styles.submitButton}>
                <span>Submit {formType} Item Report</span>
                <ArrowRightIcon />
            </button>
        </form>
    );
}
