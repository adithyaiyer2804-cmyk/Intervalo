import React from 'react';

interface BrandLogoProps {
  brand: string;
  className?: string;
  size?: number;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  brand,
  className = '',
  size = 28,
}) => {
  const normBrand = brand.toLowerCase();

  // NIKE - Authentic Swoosh
  if (normBrand.includes('nike')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-label="Nike Official Logo"
      >
        <path d="M21.707 5.293c-2.31 1.76-5.83 4.22-9.45 6.47-3.08 1.91-5.88 3.52-7.85 4.54-1.28.66-2.18.99-2.73.99-.48 0-.82-.25-.97-.69-.17-.51-.08-1.21.28-2.01.54-1.2 1.48-2.67 2.76-4.29 1.12-1.42 2.39-2.88 3.69-4.23l.11-.11c-1.39 1.33-2.77 2.82-3.96 4.33-1.2 1.52-2.1 2.92-2.6 4.04-.33.74-.4 1.33-.24 1.74.15.38.48.58.98.58.55 0 1.45-.33 2.72-.99 1.95-1.02 4.74-2.62 7.8-4.52 3.63-2.26 7.15-4.72 9.46-6.48.56-.43 1.12-.22.99.63z" />
      </svg>
    );
  }

  // STARBUCKS - Iconic Twin-Tailed Siren Medallion
  if (normBrand.includes('starbucks')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        className={className}
        aria-label="Starbucks Official Logo"
      >
        <circle cx="24" cy="24" r="23" fill="#00704A" stroke="#ffffff" strokeWidth="1.5" />
        {/* Crown & Star */}
        <polygon points="24,9 25.5,13.5 30,13.5 26.5,16 28,20.5 24,18 20,20.5 21.5,16 18,13.5 22.5,13.5" fill="#ffffff" />
        <rect x="20" y="19" width="8" height="2" rx="1" fill="#ffffff" />
        {/* Siren Face & Hair Waves */}
        <path d="M24 21C21 21 19 23.5 19 26.5C19 29.5 21 32 24 32C27 32 29 29.5 29 26.5C29 23.5 27 21 24 21Z" fill="#ffffff" />
        <circle cx="22" cy="25" r="0.9" fill="#00704A" />
        <circle cx="26" cy="25" r="0.9" fill="#00704A" />
        <path d="M22.5 28C23.2 29 24.8 29 25.5 28" stroke="#00704A" strokeWidth="0.8" strokeLinecap="round" />
        {/* Mermaid Waves/Tails */}
        <path d="M12 28C10 24 10 18 14 15C15 20 17 24 19 26" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M36 28C38 24 38 18 34 15C33 20 31 24 29 26" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M14 36C17 38 21 39 24 39C27 39 31 38 34 36" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // AMAZON - Wordmark + Smiling Arrow
  if (normBrand.includes('amazon')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-label="Amazon Official Logo"
      >
        {/* Bold Lowercase 'a' */}
        <path
          d="M10.8 13.5C9.6 13.5 8.7 13.2 8.7 12.1C8.7 10.7 10.1 10.2 11.5 10.2C12.4 10.2 13 10.4 13.5 10.6V11.2C13.5 12.7 12.3 13.5 10.8 13.5ZM13.6 8.3C12.8 7.9 11.7 7.7 10.5 7.7C7.6 7.7 5.8 9.3 5.8 11.9C5.8 14.1 7.4 15.3 9.8 15.3C11.3 15.3 12.6 14.6 13.4 13.7L13.6 15H15.8V8.1C15.8 5.7 14.1 4.5 11.2 4.5C9.6 4.5 8.2 4.9 7.2 5.5L7.8 7.1C8.6 6.7 9.8 6.4 11 6.4C12.8 6.4 13.6 7.1 13.6 8.3Z"
          fill="currentColor"
        />
        {/* Orange Smile Arrow */}
        <path
          d="M3.5 17.5C7.8 20.8 14.8 20.5 19.5 16.5"
          stroke="#FF9900"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M17.5 14.8L20.8 16.2L19.2 19.2"
          stroke="#FF9900"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="#FF9900"
        />
      </svg>
    );
  }

  // SPOTIFY - Curved Sound Wave Badge
  if (normBrand.includes('spotify')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-label="Spotify Official Logo"
      >
        <circle cx="12" cy="12" r="11" fill="#1DB954" />
        <path
          d="M6.8 9.2C10.2 7.8 15.4 7.6 18.2 9.4"
          stroke="#000000"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M7.6 12.1C10.5 10.9 14.6 10.7 17.1 12.3"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8.2 14.8C10.6 13.8 13.8 13.6 15.8 14.9"
          stroke="#000000"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // SWIGGY - Location Pin Monogram 'S'
  if (normBrand.includes('swiggy')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        className={className}
        aria-label="Swiggy Official Logo"
      >
        <circle cx="16" cy="16" r="15" fill="#FC8019" />
        {/* Stylized Swiggy Map-Pin S Monogram */}
        <path
          d="M16 6C11.6 6 8 9.6 8 14C8 19.5 15.2 25.5 15.5 25.8C15.8 26.1 16.2 26.1 16.5 25.8C16.8 25.5 24 19.5 24 14C24 9.6 20.4 6 16 6ZM17.8 17.2C16.8 17.8 15.2 18.2 14.2 18.2C12.8 18.2 11.8 17.5 11.8 16.2C11.8 14.2 14.5 13.6 16.2 13.2C17.2 13 18 12.6 18 11.8C18 10.8 17 10.2 15.8 10.2C14.5 10.2 13.5 10.8 13.2 11.8H11.5C11.8 9.8 13.5 8.5 15.8 8.5C18 8.5 19.8 9.6 19.8 11.8C19.8 13.8 17.2 14.5 15.5 14.8C14.5 15 13.8 15.4 13.8 16.2C13.8 17 14.8 17.5 16 17.5C17 17.5 18 17 18.4 16.2L19.8 17.2H17.8Z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  // CULT.FIT - Dynamic Fitness Eagle / Wings
  if (normBrand.includes('cult')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        className={className}
        aria-label="Cult.fit Official Logo"
      >
        <circle cx="16" cy="16" r="15" fill="#18181b" stroke="#FF3278" strokeWidth="2" />
        {/* Dynamic Cult.fit Chevron Energy Wings */}
        <path
          d="M16 6L23 13L20 16L16 12L12 16L9 13L16 6Z"
          fill="#FF3278"
        />
        <path
          d="M16 14L22 20L19.5 22.5L16 19L12.5 22.5L10 20L16 14Z"
          fill="#ffffff"
        />
        <circle cx="16" cy="25" r="1.5" fill="#FF3278" />
      </svg>
    );
  }

  // HERMAN MILLER - Architectural Geometric Crown Arch
  if (normBrand.includes('herman')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        className={className}
        aria-label="Herman Miller Official Logo"
      >
        <circle cx="16" cy="16" r="15" fill="#002B49" stroke="#E11D48" strokeWidth="1.5" />
        {/* Iconic Herman Miller 'M' Arch Double Shell */}
        <path
          d="M7 23V11C7 8 10 8 11.5 10L16 16L20.5 10C22 8 25 8 25 11V23H22V14.5L18 20H14L10 14.5V23H7Z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  // APPLE - Precision Bitten Apple Silhouette
  if (normBrand.includes('apple')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-label="Apple Official Logo"
      >
        {/* Leaf */}
        <path d="M15.5 2.5C14.8 3.4 13.8 4 12.8 3.8C12.6 2.8 13.2 1.8 13.8 1.1C14.5 0.3 15.6 0 16.5 0C16.6 1.1 16.2 1.8 15.5 2.5Z" />
        {/* Bitten Apple Body */}
        <path d="M19.3 15.6C18.6 16.7 17.9 17.8 16.7 17.8C15.6 17.8 15.2 17.1 13.8 17.1C12.5 17.1 12 17.8 10.9 17.8C9.8 17.8 9 16.6 8.3 15.6C6.8 13.4 5.6 9.5 7.1 6.8C7.9 5.4 9.3 4.5 10.8 4.5C12 4.5 12.8 5.3 13.6 5.3C14.3 5.3 15.2 4.5 16.5 4.5C17.1 4.5 18.5 4.7 19.5 6C19.4 6.1 17.9 7 17.9 9.1C18 11.5 20 12.3 20.1 12.4C20 12.7 19.7 13.8 19.3 15.6Z" />
      </svg>
    );
  }

  // DECATHLON - Bold Athletic Monogram / Wordmark
  if (normBrand.includes('decathlon')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        className={className}
        aria-label="Decathlon Official Logo"
      >
        <rect x="2" y="7" width="28" height="18" rx="4" fill="#0082C3" />
        {/* DECATHLON Block Typography 'D' & Runner Arch */}
        <path
          d="M8 11H12C15 11 16.5 13 16.5 16C16.5 19 15 21 12 21H8V11ZM10.5 13V19H12C13.5 19 14.2 18 14.2 16C14.2 14 13.5 13 12 13H10.5Z"
          fill="#ffffff"
        />
        <path
          d="M18 11H23.5V13.2H20.5V15H23V17H20.5V18.8H23.5V21H18V11Z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  // ZOMATO - Red Circle with Dining Fork / Heart Monogram
  if (normBrand.includes('zomato')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        className={className}
        aria-label="Zomato Official Logo"
      >
        <circle cx="16" cy="16" r="15" fill="#E23744" />
        <path
          d="M10 11H22L13 21H22V23H10L19 13H10V11Z"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="0.8"
        />
      </svg>
    );
  }

  // BOOKMYSHOW - Cinema Ticket Pass Monogram
  if (normBrand.includes('bookmyshow') || normBrand.includes('movie')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        className={className}
        aria-label="BookMyShow Official Logo"
      >
        <circle cx="16" cy="16" r="15" fill="#C42A36" />
        {/* BMS Ticket Outline */}
        <rect x="7" y="10" width="18" height="12" rx="2" stroke="#ffffff" strokeWidth="1.8" />
        <circle cx="7" cy="16" r="2.5" fill="#C42A36" />
        <circle cx="25" cy="16" r="2.5" fill="#C42A36" />
        <line x1="16" y1="12" x2="16" y2="20" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="2 2" />
      </svg>
    );
  }

  // UBER - Clean Black Monogram Badge
  if (normBrand.includes('uber')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        className={className}
        aria-label="Uber Official Logo"
      >
        <circle cx="16" cy="16" r="15" fill="#000000" stroke="#ffffff33" strokeWidth="1.5" />
        <path
          d="M9 11H12.5V17C12.5 18.5 13.5 19.5 15 19.5C16.5 19.5 17.5 18.5 17.5 17V11H21V17C21 20.5 18.5 22.5 15 22.5C11.5 22.5 9 20.5 9 17V11Z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  // Default clean voucher coin badge
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
      <text x="12" y="16" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">₹</text>
    </svg>
  );
};
