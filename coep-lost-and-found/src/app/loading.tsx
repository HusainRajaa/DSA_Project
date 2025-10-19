export default function Loading() {
  // An enhanced loading component with a pulsing logo effect.
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      gap: '1.5rem'
    }}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        .spinner {
          display: inline-block;
          width: 50px;
          height: 50px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #ef4444;
          animation: spin 1s ease-in-out infinite;
        }
        .loadingText {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          animation: pulse 2s ease-in-out infinite;
        }
        .loadingText span {
          color: #ef4444;
        }
      `}</style>
      <div className="spinner"></div>
      <div className="loadingText">COEP <span>Lost&Found</span></div>
    </div>
  );
}

