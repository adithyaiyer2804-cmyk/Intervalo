import React from 'react';

interface ThemeIconProps {
  name: string;
  className?: string;
  size?: number;
  color?: string;
}

export const ThemeIcon: React.FC<ThemeIconProps> = ({
  name,
  className = '',
  size = 24,
  color = 'currentColor',
}) => {
  switch (name) {
    // ========================================================
    // DOCTOR DOOM / LATVERIA (Imperial, Gothic, High-Tech Steel)
    // ========================================================
    case 'castle': // Dashboard - Latverian Citadel
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Outer Citadel Walls & Spires */}
          <path
            d="M2 21H22V10L19 7V3H16V5H14V3H10V5H8V3H5V7L2 10V21Z"
            stroke={color}
            strokeWidth="1.8"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.2"
          />
          {/* Center High Tower with Emerald Spire */}
          <path d="M9 10L12 4L15 10H9Z" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="1.2" />
          {/* Arched Portcullis Gateway */}
          <path
            d="M9.5 21V15C9.5 13.62 10.62 12.5 12 12.5C13.38 12.5 14.5 13.62 14.5 15V21"
            stroke={color}
            strokeWidth="1.8"
          />
          <line x1="12" y1="13" x2="12" y2="21" stroke={color} strokeWidth="1.2" />
          <line x1="9.5" y1="18" x2="14.5" y2="18" stroke={color} strokeWidth="1.2" />
          {/* Latverian Glowing Slit Windows */}
          <rect x="5.5" y="11" width="1.5" height="3" rx="0.5" fill={color} />
          <rect x="17" y="11" width="1.5" height="3" rx="0.5" fill={color} />
        </svg>
      );

    case 'shield-mask': // Breaks - Doctor Doom Mask & Latverian Shield
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Imperial Shield Crest */}
          <path
            d="M12 2L3.5 5.5V11.5C3.5 16.8 7.2 21.3 12 22.5C16.8 21.3 20.5 16.8 20.5 11.5V5.5L12 2Z"
            stroke={color}
            strokeWidth="1.8"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.15"
          />
          {/* Doom Steel Hood Outline */}
          <path
            d="M6.5 8C6.5 5.5 8.9 4 12 4C15.1 4 17.5 5.5 17.5 8V12C17.5 15.5 15 18 12 18C9 18 6.5 15.5 6.5 12V8Z"
            stroke={color}
            strokeWidth="1.4"
          />
          {/* Angled Glowing Eyeslits */}
          <polygon points="7.5,9.5 10.5,10.5 8,11.8 7.5,10.2" fill={color} />
          <polygon points="16.5,9.5 13.5,10.5 16,11.8 16.5,10.2" fill={color} />
          {/* Riveted Mouth Grille */}
          <rect x="9.5" y="13.2" width="5" height="3.8" rx="0.8" stroke={color} strokeWidth="1.3" />
          <line x1="11" y1="13.2" x2="11" y2="17" stroke={color} strokeWidth="1.1" />
          <line x1="13" y1="13.2" x2="13" y2="17" stroke={color} strokeWidth="1.1" />
          {/* Rivets on cheekplates */}
          <circle cx="8" cy="14" r="0.7" fill={color} />
          <circle cx="16" cy="14" r="0.7" fill={color} />
        </svg>
      );

    case 'gem-medallion': // Rewards - Latverian Emerald & Titanium Coin
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Outer Heavy Riveted Medallion */}
          <polygon
            points="12,1.5 20.5,6.5 20.5,17.5 12,22.5 3.5,17.5 3.5,6.5"
            stroke={color}
            strokeWidth="1.8"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.2"
          />
          {/* Faceted Emerald Gemstone */}
          <polygon
            points="12,5 18,8.5 18,15.5 12,19 6,15.5 6,8.5"
            stroke={color}
            strokeWidth="1.4"
            fill="currentColor"
            fillOpacity="0.4"
          />
          {/* Doom Center Monogram "D" */}
          <path d="M10 9H12.5C13.8 9 14.8 9.9 14.8 12C14.8 14.1 13.8 15 12.5 15H10V9Z" fill={color} />
          <circle cx="12" cy="3.5" r="0.7" fill={color} />
          <circle cx="12" cy="20.5" r="0.7" fill={color} />
        </svg>
      );

    case 'scroll-dagger': // Guide - Latverian Decree & Dagger
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Antique Royal Decree Scroll */}
          <path
            d="M5 4C3.89 4 3 4.89 3 6C3 7.11 3.89 8 5 8H17C18.11 8 19 7.11 19 6C19 4.89 18.11 4 17 4H5Z"
            stroke={color}
            strokeWidth="1.6"
            fill="currentColor"
            fillOpacity="0.2"
          />
          <path
            d="M5 8V18C5 19.11 5.89 20 7 20H19C20.11 20 21 19.11 21 18V6H19"
            stroke={color}
            strokeWidth="1.6"
          />
          <line x1="8" y1="11" x2="15" y2="11" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
          <line x1="8" y1="14" x2="16" y2="14" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
          <line x1="8" y1="17" x2="13" y2="17" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
          {/* Crossguard Latverian Steel Dagger */}
          <line x1="14" y1="5" x2="21" y2="12" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
          <line x1="17" y1="4" x2="15" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'crown-scepter': // Profile - Imperial Crown & Emerald Scepter
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Royal Crown Crest */}
          <path
            d="M2.5 17L4.5 6.5L9 11L12 3.5L15 11L19.5 6.5L21.5 17H2.5Z"
            stroke={color}
            strokeWidth="1.8"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.25"
          />
          {/* Jewels on Crown Spikes */}
          <circle cx="12" cy="3.5" r="1.5" fill={color} />
          <circle cx="4.5" cy="6.5" r="1.2" fill={color} />
          <circle cx="19.5" cy="6.5" r="1.2" fill={color} />
          {/* Base Rim with Embedded Emeralds */}
          <rect x="2.5" y="17.5" width="19" height="3" rx="1.5" fill={color} />
          <circle cx="8" cy="19" r="0.8" fill="#ffffff" />
          <circle cx="12" cy="19" r="0.8" fill="#ffffff" />
          <circle cx="16" cy="19" r="0.8" fill="#ffffff" />
        </svg>
      );

    // ========================================================
    // SPIDER-MAN (Full Webmask, Webshooters, Spidersignal)
    // ========================================================
    case 'spidey-mask': // Dashboard
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Comic Spider-Man Head Contour */}
          <path
            d="M12 2C6.2 2 3 6.8 3 12.8C3 18 7.5 21.8 12 22.5C16.5 21.8 21 18 21 12.8C21 6.8 17.8 2 12 2Z"
            stroke={color}
            strokeWidth="1.8"
            fill="currentColor"
            fillOpacity="0.15"
          />
          {/* Spider-Web Netting Across Head */}
          <path d="M12 2V22M3 12.8H21" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
          <path d="M5.5 6L18.5 19M18.5 6L5.5 19" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
          {/* Iconic Triangular White Lenses with Thick Black Rims */}
          <path
            d="M5.5 9.8C7.5 13.8 10 14.5 11.2 14.2C11.5 12 10.8 8.2 8.2 6.5C6.5 7.8 5.5 8.8 5.5 9.8Z"
            stroke={color}
            strokeWidth="1.8"
            fill="#ffffff"
          />
          <path
            d="M18.5 9.8C16.5 13.8 14 14.5 12.8 14.2C12.5 12 13.2 8.2 15.8 6.5C17.5 7.8 18.5 8.8 18.5 9.8Z"
            stroke={color}
            strokeWidth="1.8"
            fill="#ffffff"
          />
        </svg>
      );

    case 'web-shooter': // Breaks - Wrist Gauntlet & Spiral Web
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* High-Tech Gauntlet Plate */}
          <circle cx="12" cy="12" r="9.5" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.1" />
          {/* Spider Web Radial Strands */}
          <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1="12" y1="2.5" x2="12" y2="21.5" stroke={color} strokeWidth="1.4" />
          <line x1="2.5" y1="12" x2="21.5" y2="12" stroke={color} strokeWidth="1.4" />
          <line x1="5.5" y1="5.5" x2="18.5" y2="18.5" stroke={color} strokeWidth="1.2" />
          <line x1="18.5" y1="5.5" x2="5.5" y2="18.5" stroke={color} strokeWidth="1.2" />
          {/* Center Web Nozzle Trigger */}
          <circle cx="12" cy="12" r="3.2" fill={color} />
          <circle cx="12" cy="12" r="1.5" fill="#ffffff" />
        </svg>
      );

    case 'daily-bugle': // Rewards - 8-Legged Spider Chest Insignia
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Outer Gold Medallion */}
          <circle cx="12" cy="12" r="9.5" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.2" />
          {/* Center Spider Abdomen & Head */}
          <ellipse cx="12" cy="10" rx="2" ry="3" fill={color} />
          <circle cx="12" cy="14.5" rx="2.5" ry="3.5" fill={color} />
          {/* 8 Angular Spider Legs */}
          <path d="M10 9L6 6M10 11L5 10M10 13L5 15M10 15L7 19" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M14 9L18 6M14 11L19 10M14 13L19 15M14 15L17 19" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'spider-signal': // Guide - Searchlight Projector
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.2" />
          <path d="M12 1V4M12 20V23M1 12H4M20 12H23" stroke={color} strokeWidth="2" strokeLinecap="round" />
          {/* Spider Face Silhouette inside searchlight */}
          <polygon points="9,10 12,8 15,10 14,14 12,16 10,14" fill={color} />
          <circle cx="10.5" cy="11.5" r="0.8" fill="#ffffff" />
          <circle cx="13.5" cy="11.5" r="0.8" fill="#ffffff" />
        </svg>
      );

    case 'spider-drone': // Profile - Stark-Tech Spider Drone
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="8.5" y="8.5" width="7" height="7" rx="2" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.3" />
          <path d="M8.5 8.5L3.5 3.5M15.5 8.5L20.5 3.5M8.5 15.5L3.5 20.5M15.5 15.5L20.5 20.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <circle cx="3.5" cy="3.5" r="1.5" fill={color} />
          <circle cx="20.5" cy="3.5" r="1.5" fill={color} />
          <circle cx="3.5" cy="20.5" r="1.5" fill={color} />
          <circle cx="20.5" cy="20.5" r="1.5" fill={color} />
          <circle cx="12" cy="12" r="1.8" fill={color} />
        </svg>
      );

    // ========================================================
    // RAMAYAN (Kodanda Bow, Sanjeevani, 10-Headed Ravan Crown, Shankha)
    // ========================================================
    case 'dhanush-bow': // Dashboard - Sacred Kodanda Bow & Brahmastra
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Curved Golden Kodanda Bow with ornate recurve tips */}
          <path
            d="M3 4C13 4 19.5 10.5 20 20.5"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Bowstring */}
          <line x1="3" y1="4" x2="20" y2="20.5" stroke={color} strokeWidth="1.2" strokeDasharray="3 1" />
          {/* Golden Arrow with Suryastra Radiance */}
          <line x1="5.5" y1="18.5" x2="19.5" y2="4.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
          <polygon points="20.5,3.5 15,4.5 19.5,9" fill={color} stroke={color} strokeWidth="1" />
          {/* Fletching feathers */}
          <line x1="5.5" y1="18.5" x2="4" y2="16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <line x1="5.5" y1="18.5" x2="7.5" y2="20" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'sanjeevani': // Breaks - Sacred Mountain & Prana Herb
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Dronagiri Sacred Mountain Peak */}
          <polygon points="12,2 21,21 3,21" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.15" />
          {/* Sacred Glowing Sanjeevani Lotus/Plant */}
          <path
            d="M12 7C10.5 9.5 8 11.5 8 14C8 16.5 9.8 18 12 18C14.2 18 16 16.5 16 14C16 11.5 13.5 9.5 12 7Z"
            stroke={color}
            strokeWidth="1.6"
            fill={color}
            fillOpacity="0.4"
          />
          <path d="M12 11V18M9.5 14.5L12 13L14.5 14.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
          {/* Celestial Sun Rays */}
          <line x1="12" y1="2" x2="12" y2="0" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="4" x2="18" y2="2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <line x1="8" y1="4" x2="6" y2="2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'ravan-crown': // Rewards - 10-Crowned Dashanan Swarna Mukut
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* 10-Point Golden Royal Crown Peaks */}
          <path
            d="M2 17.5L3.5 8L6.5 13L9.5 6L12 12.5L14.5 6L17.5 13L20.5 8L22 17.5H2Z"
            stroke={color}
            strokeWidth="1.8"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.25"
          />
          {/* Center Royal Surya Gem */}
          <circle cx="12" cy="5" r="1.5" fill={color} />
          <circle cx="9.5" cy="5.5" r="1" fill={color} />
          <circle cx="14.5" cy="5.5" r="1" fill={color} />
          {/* Gold Ingot Base with Ruby Inlays */}
          <rect x="2" y="17.5" width="20" height="3.5" rx="1" fill={color} />
          <circle cx="6" cy="19.2" r="0.8" fill="#ffffff" />
          <circle cx="12" cy="19.2" r="0.8" fill="#ffffff" />
          <circle cx="18" cy="19.2" r="0.8" fill="#ffffff" />
        </svg>
      );

    case 'vedic-scroll': // Guide - Palm Leaf Bhojpatra Manuscript
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Palm Leaf Manuscript */}
          <rect x="3.5" y="4.5" width="17" height="15" rx="2" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.15" />
          {/* Sacred Ribbon Wrap */}
          <line x1="8.5" y1="4.5" x2="8.5" y2="19.5" stroke={color} strokeWidth="2" />
          {/* Sacred Shloka Lines */}
          <line x1="11.5" y1="8" x2="17.5" y2="8" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
          <line x1="11.5" y1="12" x2="18.5" y2="12" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
          <line x1="11.5" y1="16" x2="16" y2="16" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'shankha': // Profile - Sacred Divine Conch Shell
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Sacred Conch Contour */}
          <path
            d="M12 2C7.5 2 4.5 5.5 4.5 10C4.5 14.5 8 19 12 22C16 19 19.5 14.5 19.5 10C19.5 5.5 16.5 2 12 2Z"
            stroke={color}
            strokeWidth="1.8"
            fill="currentColor"
            fillOpacity="0.2"
          />
          {/* Spiral Whirl of the Shankha */}
          <path
            d="M12 5.5C9.8 5.5 8 7.3 8 9.5C8 12.5 12 16 12 16C12 16 16 12.5 16 9.5C16 7.3 14.2 5.5 12 5.5Z"
            stroke={color}
            strokeWidth="1.5"
          />
          {/* Holy Tilak Marking */}
          <circle cx="12" cy="9.5" r="1.5" fill={color} />
          <line x1="12" y1="12" x2="12" y2="14.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );

    // ========================================================
    // NARUTO (Konoha Headband, Kunai, Ramen & Toad, Hokage Hat)
    // ========================================================
    case 'leaf-band': // Dashboard - Hidden Leaf Headband
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Headband Cloth Ribbon Tails */}
          <path d="M1 9L4 7M1 15L4 17M23 9L20 7M23 15L20 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          {/* Steel Headband Plate */}
          <rect x="3.5" y="7" width="17" height="10" rx="2.5" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.2" />
          {/* Metal Corner Rivets */}
          <circle cx="5.5" cy="9" r="0.7" fill={color} />
          <circle cx="5.5" cy="15" r="0.7" fill={color} />
          <circle cx="18.5" cy="9" r="0.7" fill={color} />
          <circle cx="18.5" cy="15" r="0.7" fill={color} />
          {/* Engraved Leaf Village Swirl Insignia */}
          <path
            d="M12 9.5C10.2 9.5 9.2 10.7 9.2 12C9.2 13.5 10.6 14.5 12 14.5C13.8 14.5 14.8 13.2 14.8 11.5C14.8 9.5 12.8 8 10.5 8"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path d="M7.8 15.2L9.5 14" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'hand-signs': // Breaks - Crossed Shinobi Kunai with Tags
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Primary Kunai Dagger */}
          <polygon points="12,1.5 15.5,9.5 13,9.5 13,16 11,16 11,9.5 8.5,9.5" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.3" />
          {/* Finger Ring Grip */}
          <circle cx="12" cy="19.5" r="2.5" stroke={color} strokeWidth="1.8" />
          {/* Paper Explosive Tag Streamer */}
          <rect x="13.5" y="11" width="6" height="3" rx="0.5" stroke={color} strokeWidth="1.2" fill="#ffffff" fillOpacity="0.8" />
          <line x1="15" y1="12.5" x2="18" y2="12.5" stroke="#000000" strokeWidth="1" />
        </svg>
      );

    case 'ramen-toad': // Rewards - Ichiraku Ramen Bowl with Narutomaki
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Steaming Ceramic Bowl */}
          <path
            d="M3.5 11C3.5 16.5 7.5 20 12 20C16.5 20 20.5 16.5 20.5 11H3.5Z"
            stroke={color}
            strokeWidth="1.8"
            fill="currentColor"
            fillOpacity="0.25"
          />
          <line x1="8" y1="21.5" x2="16" y2="21.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
          {/* Narutomaki Swirl Fishcake */}
          <circle cx="12" cy="13.5" r="2.5" fill="#ffffff" stroke={color} strokeWidth="1" />
          <path d="M12 12C11.2 12 10.8 12.5 10.8 13.2C10.8 14 11.5 14.5 12 14.5" stroke="#ef4444" strokeWidth="1" strokeLinecap="round" />
          {/* Chopsticks Rest */}
          <line x1="2" y1="9" x2="22" y2="9" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          {/* Steaming Noodles Curls */}
          <path d="M8 6C8 4 9.5 4 9.5 2M14.5 6C14.5 4 16 4 16 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'ninja-scroll': // Guide - Secret Kuchiyose Summoning Scroll
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="5" y="3.5" width="14" height="17" rx="2" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.2" />
          {/* Scroll Wooden End Rollers */}
          <rect x="3" y="10" width="3" height="4" rx="1" fill={color} />
          <rect x="18" y="10" width="3" height="4" rx="1" fill={color} />
          {/* Center Ninja Summoning Circle */}
          <circle cx="12" cy="12" r="3.5" stroke={color} strokeWidth="1.4" strokeDasharray="2 2" />
          <circle cx="12" cy="12" r="1.5" fill={color} />
        </svg>
      );

    case 'hokage-hat': // Profile - Official Hokage Triangular Hat & Veil
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Triangular Crimson Straw Crown */}
          <polygon points="12,2 2,12.5 22,12.5" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.3" />
          {/* White Drape Veil */}
          <path d="M6 12.5V21.5H18V12.5" stroke={color} strokeWidth="1.8" />
          {/* Bold Kanji for Fire: "火" */}
          <text x="12" y="10.8" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">火</text>
        </svg>
      );

    // ========================================================
    // F.R.I.E.N.D.S (Orange Couch, Central Perk Mug, Yellow Frame)
    // ========================================================
    case 'orange-couch': // Dashboard - Central Perk Orange Tufted Sofa
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Tufted Backrest */}
          <path
            d="M4 8C4 6.5 5.5 5 7 5H17C18.5 5 20 6.5 20 8V14H4V8Z"
            stroke={color}
            strokeWidth="1.8"
            fill="currentColor"
            fillOpacity="0.3"
          />
          {/* Tuft Buttons */}
          <circle cx="8" cy="8.5" r="0.8" fill={color} />
          <circle cx="12" cy="8.5" r="0.8" fill={color} />
          <circle cx="16" cy="8.5" r="0.8" fill={color} />
          {/* Rolled Armrests */}
          <rect x="2" y="10.5" width="3.5" height="6.5" rx="1.7" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.4" />
          <rect x="18.5" y="10.5" width="3.5" height="6.5" rx="1.7" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.4" />
          {/* Thick Velvet Seat Cushion */}
          <rect x="5.5" y="13" width="13" height="4" rx="1" stroke={color} strokeWidth="1.5" fill="currentColor" fillOpacity="0.5" />
          {/* Wooden Turned Legs */}
          <line x1="6.5" y1="17" x2="5.5" y2="21" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
          <line x1="17.5" y1="17" x2="18.5" y2="21" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    case 'coffee-mug': // Breaks - Central Perk Ceramic Coffee Mug
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M3.5 8H16.5V15C16.5 18 14 20 10 20H10C6 20 3.5 18 3.5 15V8Z"
            stroke={color}
            strokeWidth="1.8"
            fill="currentColor"
            fillOpacity="0.2"
          />
          {/* Mug Handle */}
          <path d="M16.5 10H19.5C21 10 22 11.2 22 12.8C22 14.4 21 15.5 19.5 15.5H16.5" stroke={color} strokeWidth="1.8" />
          {/* Coffee Foam Heart */}
          <path d="M10 11C9.2 10.2 8 10.5 8 11.5C8 12.8 10 14 10 14C10 14 12 12.8 12 11.5C12 10.5 10.8 10.2 10 11Z" fill={color} />
          {/* Rising Aromatic Steam */}
          <path d="M7 5C7 3.5 8 3 8 1.5M13 5C13 3.5 14 3 14 1.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'yellow-frame': // Rewards - Monica's Baroque Peephole Frame
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Baroque Ornate Yellow Frame */}
          <rect x="4" y="2.5" width="16" height="19" rx="4.5" stroke={color} strokeWidth="2.2" fill="currentColor" fillOpacity="0.25" />
          <ellipse cx="12" cy="12" rx="4.2" ry="6" stroke={color} strokeWidth="1.8" strokeDasharray="3 2" />
          {/* Peephole viewer lens */}
          <circle cx="12" cy="12" r="1.8" fill={color} />
          <circle cx="12" cy="12" r="0.8" fill="#ffffff" />
        </svg>
      );

    case 'guitar-lobster': // Guide - Phoebe's Guitar
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="8" cy="16" r="5" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.2" />
          <circle cx="10" cy="12" r="3" stroke={color} strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" />
          <line x1="12" y1="10" x2="20" y2="2" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="8" cy="16" r="1.5" fill={color} />
          {/* Musical Notes */}
          <path d="M17 12V8L21 6V10" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="17" cy="12" r="1" fill={color} />
          <circle cx="21" cy="10" r="1" fill={color} />
        </svg>
      );

    case 'purple-door': // Profile - Apartment Door #20
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="4" y="2" width="16" height="20" rx="2" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.2" />
          <rect x="6.5" y="4.5" width="11" height="6.5" rx="1" stroke={color} strokeWidth="1.2" />
          <rect x="6.5" y="13" width="11" height="7" rx="1" stroke={color} strokeWidth="1.2" />
          {/* Gold Peephole & Door Knob */}
          <circle cx="12" cy="7.8" r="1.2" fill={color} />
          <circle cx="15.5" cy="13" r="1.2" fill={color} />
        </svg>
      );

    // ========================================================
    // THE OFFICE (Best Boss Mug, Jello Stapler, Dundie, Paper Ream, Beet)
    // ========================================================
    case 'best-boss-mug': // Dashboard
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="4" y="5" width="13" height="15" rx="2.5" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.2" />
          <path d="M17 8.5H19.5C21 8.5 22 9.8 22 11.2C22 12.6 21 13.8 19.5 13.8H17" stroke={color} strokeWidth="1.8" />
          <text x="10.5" y="12" textAnchor="middle" fill={color} fontSize="4.8" fontWeight="bold">#1</text>
          <text x="10.5" y="16.5" textAnchor="middle" fill={color} fontSize="3.6" fontWeight="bold">BOSS</text>
        </svg>
      );

    case 'stapler-jello': // Breaks - Stapler in Jello Mold
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Translucent Gelatin Mold */}
          <path
            d="M4.5 19.5L6.8 7.5C7.2 4.5 16.8 4.5 17.2 7.5L19.5 19.5H4.5Z"
            stroke={color}
            strokeWidth="1.8"
            fill="currentColor"
            fillOpacity="0.25"
          />
          {/* Suspended Stapler */}
          <rect x="8" y="11.5" width="8" height="3.5" rx="1" stroke={color} strokeWidth="1.5" fill="#ffffff" fillOpacity="0.7" />
          <line x1="8" y1="15" x2="12" y2="15" stroke={color} strokeWidth="1.6" />
        </svg>
      );

    case 'dundie-trophy': // Rewards - Golden Dundie Award
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Golden Cup / Figurine */}
          <path
            d="M6 3.5H18V8.5C18 11.8 15.3 14.5 12 14.5C8.7 14.5 6 11.8 6 8.5V3.5Z"
            stroke={color}
            strokeWidth="1.8"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <path d="M6 5.5H3C2.5 5.5 2 6.5 2 7.5C2 9.2 3.5 10.5 5 10.5H6" stroke={color} strokeWidth="1.5" />
          <path d="M18 5.5H21C21.5 5.5 22 6.5 22 7.5C22 9.2 20.5 10.5 19 10.5H18" stroke={color} strokeWidth="1.5" />
          <line x1="12" y1="14.5" x2="12" y2="18" stroke={color} strokeWidth="2.2" />
          {/* Heavy Marble Pedestal */}
          <rect x="7" y="18" width="10" height="3.5" rx="1" fill={color} />
        </svg>
      );

    case 'paper-ream': // Guide - Dunder Mifflin Paper Box
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <polygon points="12,2 21.5,7 21.5,17 12,22 2.5,17 2.5,7" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.2" />
          <line x1="12" y1="22" x2="12" y2="12" stroke={color} strokeWidth="1.8" />
          <line x1="21.5" y1="7" x2="12" y2="12" stroke={color} strokeWidth="1.8" />
          <line x1="2.5" y1="7" x2="12" y2="12" stroke={color} strokeWidth="1.8" />
        </svg>
      );

    case 'schrute-beet': // Profile - Dwight's Beet & Aviators
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Red Beet Root */}
          <path
            d="M12 7.5C7 7.5 5 11.5 5 14.5C5 18.5 12 22.5 12 22.5C12 22.5 19 18.5 19 14.5C19 11.5 17 7.5 12 7.5Z"
            stroke={color}
            strokeWidth="1.8"
            fill="currentColor"
            fillOpacity="0.35"
          />
          {/* Leafy Green Tops */}
          <path d="M12 7.5V1.5M9 5.5L7 2M15 5.5L17 2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          {/* Dwight's Aviator Glasses */}
          <rect x="7" y="11" width="4" height="3" rx="0.5" stroke={color} strokeWidth="1.2" />
          <rect x="13" y="11" width="4" height="3" rx="0.5" stroke={color} strokeWidth="1.2" />
          <line x1="11" y1="12" x2="13" y2="12" stroke={color} strokeWidth="1.2" />
        </svg>
      );

    // ========================================================
    // BATMAN (Gotham Dark Knight)
    // ========================================================
    case 'bat-signal':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="9.5" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.2" />
          <path d="M12 7.5C10.5 7.5 9.5 8.5 8 7.5C7 10.5 8 13.5 12 16.5C16 13.5 17 10.5 16 7.5C14.5 8.5 13.5 7.5 12 7.5Z" fill={color} />
        </svg>
      );

    case 'batarang':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M2 9.5C7 11.5 10 9.5 12 12.5C14 9.5 17 11.5 22 9.5C20 14.5 16 18.5 12 16.5C8 18.5 4 14.5 2 9.5Z" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.35" />
        </svg>
      );

    case 'wayne-vault':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="3" y="3" width="18" height="18" rx="3.5" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.2" />
          <circle cx="12" cy="12" r="4.5" stroke={color} strokeWidth="1.8" />
          <line x1="12" y1="7.5" x2="12" y2="9.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="14.5" x2="12" y2="16.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="7.5" y1="12" x2="9.5" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="14.5" y1="12" x2="16.5" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'bat-computer':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="3" y="4" width="18" height="12" rx="2" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.2" />
          <line x1="12" y1="16" x2="12" y2="20" stroke={color} strokeWidth="2" />
          <line x1="8" y1="20" x2="16" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="10" r="2" fill={color} />
        </svg>
      );

    case 'batmobile':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M4 14L6 8L10 7L12 9L14 7L18 8L20 14H4Z" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.25" />
          <circle cx="7" cy="16.5" r="2.5" stroke={color} strokeWidth="1.8" fill="#111" />
          <circle cx="17" cy="16.5" r="2.5" stroke={color} strokeWidth="1.8" fill="#111" />
          <line x1="9.5" y1="16.5" x2="14.5" y2="16.5" stroke={color} strokeWidth="1.8" />
        </svg>
      );

    // ========================================================
    // THE MATRIX (Neo Sunglasses, Red Pill, Phone, Digital Rain)
    // ========================================================
    case 'matrix-glasses':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Neo's Sleek Wireframe Oval Sunglasses */}
          <path d="M2.5 12C2.5 10 4.5 9 7.5 9C10.5 9 11.5 10.5 11.5 12C11.5 13.5 10 14.5 7.5 14.5C5 14.5 2.5 13.5 2.5 12Z" fill="#111" stroke={color} strokeWidth="1.6" />
          <path d="M12.5 12C12.5 10.5 13.5 9 16.5 9C19.5 9 21.5 10 21.5 12C21.5 13.5 19 14.5 16.5 14.5C14 14.5 12.5 13.5 12.5 12Z" fill="#111" stroke={color} strokeWidth="1.6" />
          <line x1="11.5" y1="11.5" x2="12.5" y2="11.5" stroke={color} strokeWidth="1.6" />
          <line x1="2.5" y1="11.5" x2="1" y2="11.5" stroke={color} strokeWidth="1.2" />
          <line x1="21.5" y1="11.5" x2="23" y2="11.5" stroke={color} strokeWidth="1.2" />
          {/* Digital rain reflection in lens */}
          <line x1="5.5" y1="10.5" x2="5.5" y2="13" stroke={color} strokeWidth="1" strokeDasharray="1 1" />
          <line x1="18.5" y1="10.5" x2="18.5" y2="13" stroke={color} strokeWidth="1" strokeDasharray="1 1" />
        </svg>
      );

    case 'matrix-pill':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Red Pill */}
          <rect x="3.5" y="8" width="8" height="15" rx="4" transform="rotate(-30 7.5 15.5)" fill="#ef4444" stroke={color} strokeWidth="1.4" />
          <line x1="5" y1="11.5" x2="11.5" y2="7.8" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
          {/* Blue Pill */}
          <rect x="12.5" y="4" width="8" height="15" rx="4" transform="rotate(30 16.5 11.5)" fill="#3b82f6" stroke={color} strokeWidth="1.4" />
          <line x1="13.5" y1="7.8" x2="20" y2="11.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case 'matrix-phone':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Hardline Matrix Telephone Exit */}
          <path d="M4 6C4 4.5 5.5 3.5 7 3.5H9L10.5 7L8.5 8.5C9.8 11.5 12.5 14.2 15.5 15.5L17 13.5L20.5 15V17C20.5 18.5 19.5 20 18 20C10.2 20 4 13.8 4 6Z" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.25" strokeLinejoin="round" />
          <circle cx="18" cy="6" r="3" stroke={color} strokeWidth="1.2" strokeDasharray="2 2" />
        </svg>
      );

    case 'matrix-code':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Cascading Green Digital Glyph Rain */}
          <text x="5" y="8" fill={color} fontSize="6" fontFamily="monospace" fontWeight="bold">0</text>
          <text x="5" y="15" fill={color} fontSize="6" fontFamily="monospace" fontWeight="bold" opacity="0.6">1</text>
          <text x="5" y="21" fill={color} fontSize="6" fontFamily="monospace" fontWeight="bold" opacity="0.3">0</text>
          <text x="12" y="6" fill="#ffffff" fontSize="6" fontFamily="monospace" fontWeight="bold">1</text>
          <text x="12" y="13" fill={color} fontSize="6" fontFamily="monospace" fontWeight="bold">0</text>
          <text x="12" y="19" fill={color} fontSize="6" fontFamily="monospace" fontWeight="bold" opacity="0.5">1</text>
          <text x="19" y="9" fill={color} fontSize="6" fontFamily="monospace" fontWeight="bold" opacity="0.8">0</text>
          <text x="19" y="16" fill={color} fontSize="6" fontFamily="monospace" fontWeight="bold" opacity="0.4">1</text>
        </svg>
      );

    case 'matrix-jack':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Cyber Cranial Jack Port */}
          <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.2" />
          <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.6" />
          <circle cx="12" cy="12" r="2" fill={color} />
          <line x1="12" y1="3" x2="12" y2="7" stroke={color} strokeWidth="1.5" />
          <line x1="12" y1="17" x2="12" y2="21" stroke={color} strokeWidth="1.5" />
          <line x1="3" y1="12" x2="7" y2="12" stroke={color} strokeWidth="1.5" />
          <line x1="17" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1.5" />
        </svg>
      );

    // ========================================================
    // RETRO 80s SYNTHWAVE (Joystick, Cassette Tape, Trophy, Grid)
    // ========================================================
    case 'retro-joystick':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Arcade Console Base */}
          <rect x="3" y="13" width="18" height="8" rx="2" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.2" />
          {/* Joystick Shaft & Red Ball */}
          <line x1="8" y1="13" x2="8" y2="6" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="8" cy="5" r="3.2" fill="#ef4444" stroke={color} strokeWidth="1.2" />
          {/* Arcade Push Buttons */}
          <circle cx="14" cy="17" r="1.8" fill="#3b82f6" />
          <circle cx="18" cy="17" r="1.8" fill="#eab308" />
        </svg>
      );

    case 'retro-tape':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* 80s Mixtape Cassette */}
          <rect x="2.5" y="5" width="19" height="14" rx="2" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.25" />
          {/* Tape Label Window */}
          <rect x="5.5" y="8" width="13" height="6" rx="1" stroke={color} strokeWidth="1.2" fill="#000000" fillOpacity="0.4" />
          {/* Spool Wheels */}
          <circle cx="9" cy="11" r="2" stroke={color} strokeWidth="1.4" />
          <circle cx="15" cy="11" r="2" stroke={color} strokeWidth="1.4" />
          <line x1="9" y1="13" x2="15" y2="13" stroke={color} strokeWidth="1.2" />
        </svg>
      );

    case 'retro-trophy':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Pixelated 8-Bit High Score Trophy */}
          <path d="M5 4H19V10C19 13.5 16 16 12 16C8 16 5 13.5 5 10V4Z" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.3" />
          <path d="M5 6H2V9C2 10.5 3.5 11.5 5 11.5" stroke={color} strokeWidth="1.5" />
          <path d="M19 6H22V9C22 10.5 20.5 11.5 19 11.5" stroke={color} strokeWidth="1.5" />
          <line x1="12" y1="16" x2="12" y2="19" stroke={color} strokeWidth="2.5" />
          <rect x="7" y="19" width="10" height="3" rx="0.5" fill={color} />
        </svg>
      );

    case 'retro-grid':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Retro Neon Sun */}
          <circle cx="12" cy="9" r="6" stroke={color} strokeWidth="1.5" fill="currentColor" fillOpacity="0.4" />
          <line x1="6" y1="9" x2="18" y2="9" stroke="#111" strokeWidth="1" />
          <line x1="7" y1="11" x2="17" y2="11" stroke="#111" strokeWidth="1" />
          {/* Wireframe 3D Perspective Grid */}
          <line x1="2" y1="14" x2="22" y2="14" stroke={color} strokeWidth="1.5" />
          <line x1="1" y1="18" x2="23" y2="18" stroke={color} strokeWidth="1.5" />
          <line x1="12" y1="14" x2="12" y2="22" stroke={color} strokeWidth="1.5" />
          <line x1="12" y1="14" x2="4" y2="22" stroke={color} strokeWidth="1.5" />
          <line x1="12" y1="14" x2="20" y2="22" stroke={color} strokeWidth="1.5" />
        </svg>
      );

    case 'retro-shades':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* 80s Neon Shutter Shades */}
          <rect x="2.5" y="8" width="8.5" height="9" rx="1.5" stroke={color} strokeWidth="1.6" fill="currentColor" fillOpacity="0.2" />
          <rect x="13" y="8" width="8.5" height="9" rx="1.5" stroke={color} strokeWidth="1.6" fill="currentColor" fillOpacity="0.2" />
          <line x1="11" y1="10" x2="13" y2="10" stroke={color} strokeWidth="2" />
          {/* Shutter Slats */}
          <line x1="3.5" y1="10.5" x2="10" y2="10.5" stroke={color} strokeWidth="1.2" />
          <line x1="3.5" y1="12.5" x2="10" y2="12.5" stroke={color} strokeWidth="1.2" />
          <line x1="3.5" y1="14.5" x2="10" y2="14.5" stroke={color} strokeWidth="1.2" />
          <line x1="14" y1="10.5" x2="20.5" y2="10.5" stroke={color} strokeWidth="1.2" />
          <line x1="14" y1="12.5" x2="20.5" y2="12.5" stroke={color} strokeWidth="1.2" />
          <line x1="14" y1="14.5" x2="20.5" y2="14.5" stroke={color} strokeWidth="1.2" />
        </svg>
      );

    // ========================================================
    // ONE PIECE / LUFFY (Straw Hat Pirates, Joyboy)
    // ========================================================
    case 'straw-hat':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Straw Hat Crown */}
          <ellipse cx="12" cy="11" rx="6.5" ry="5.5" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.3" />
          {/* Red Ribbon Band */}
          <path d="M5.8 12C7.5 13.5 16.5 13.5 18.2 12" stroke="#ef4444" strokeWidth="2.4" strokeLinecap="round" />
          {/* Wide Curved Brim */}
          <path d="M1.5 15C5 12.5 19 12.5 22.5 15C19 17.5 5 17.5 1.5 15Z" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.4" />
        </svg>
      );

    case 'meat-bone':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Bone Knobs */}
          <circle cx="4" cy="10" r="1.8" stroke={color} strokeWidth="1.4" fill="white" />
          <circle cx="4" cy="14" r="1.8" stroke={color} strokeWidth="1.4" fill="white" />
          <circle cx="20" cy="10" r="1.8" stroke={color} strokeWidth="1.4" fill="white" />
          <circle cx="20" cy="14" r="1.8" stroke={color} strokeWidth="1.4" fill="white" />
          {/* Juicy Meat Shank */}
          <ellipse cx="12" cy="12" rx="6.5" ry="5.5" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.5" />
          <circle cx="12" cy="12" r="2.2" fill="#ef4444" />
        </svg>
      );

    case 'jolly-roger':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Crossed Bones */}
          <line x1="3" y1="3" x2="21" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="21" y1="3" x2="3" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round" />
          {/* Smiling Skull */}
          <circle cx="12" cy="11" r="5.5" stroke={color} strokeWidth="1.8" fill="black" />
          {/* Straw Hat on Skull */}
          <path d="M7 8C8.5 6 15.5 6 17 8" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="10" cy="10.5" r="1.2" fill={color} />
          <circle cx="14" cy="10.5" r="1.2" fill={color} />
          {/* Big Luffy Grin */}
          <path d="M9.5 13.5C10.5 15 13.5 15 14.5 13.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );

    case 'devil-fruit':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Swirly Gomu Gomu no Mi Fruit */}
          <circle cx="12" cy="13" r="7.5" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.3" />
          {/* Swirl Pattern */}
          <path d="M10 10C11.5 8.5 14 9.5 13.5 11.5C13 13 11 13 12 15C13 16.5 15 15.5 15 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          {/* Stem with Spiral */}
          <path d="M12 5.5C12 3.5 14.5 2.5 16 3.5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'thousand-sunny':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Lion Mane Wheel / Ship Helm */}
          <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.2" />
          <circle cx="12" cy="12" r="2.5" fill={color} />
          {/* Helm Spokes / Lion Petals */}
          <line x1="12" y1="2" x2="12" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="18" x2="12" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="2" y1="12" x2="6" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="12" x2="22" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // ========================================================
    // JUJUTSU KAISEN / GOJO SATORU
    // ========================================================
    case 'gojo-eyes':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Black Blindfold Ribbon */}
          <rect x="2" y="9" width="20" height="6.5" rx="2" fill="#09090b" stroke={color} strokeWidth="1.8" />
          {/* Six Eyes Azure Glow Peek */}
          <circle cx="8" cy="12.2" r="1.8" fill="#38bdf8" />
          <circle cx="16" cy="12.2" r="1.8" fill="#38bdf8" />
          <circle cx="8" cy="12.2" r="0.8" fill="#ffffff" />
          <circle cx="16" cy="12.2" r="0.8" fill="#ffffff" />
          {/* Spiked White Hair Tips */}
          <path d="M5 9L3 4L7 7L10 3L12 7L14 3L17 7L21 4L19 9" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );

    case 'hollow-purple':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Red (Convergence) Sphere */}
          <circle cx="9" cy="12" r="5" stroke="#ef4444" strokeWidth="1.8" fill="#ef4444" fillOpacity="0.4" />
          {/* Blue (Divergence) Sphere */}
          <circle cx="15" cy="12" r="5" stroke="#3b82f6" strokeWidth="1.8" fill="#3b82f6" fillOpacity="0.4" />
          {/* Hollow Purple Fusion Center */}
          <circle cx="12" cy="12" r="3.2" fill="#a855f7" stroke="#ffffff" strokeWidth="1.5" />
          {/* Cursed Energy Distortion Rays */}
          <line x1="12" y1="3" x2="12" y2="6" stroke="#c084fc" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="12" y1="18" x2="12" y2="21" stroke="#c084fc" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'sukuna-finger':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Cursed Talisman Finger */}
          <path d="M8 21V9C8 6.5 10 4 12 4C14 4 16 6.5 16 9V21H8Z" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.3" />
          {/* Sharp Demon Black Claw */}
          <path d="M10 7C10 5 12 3 12 3C12 3 14 5 14 7H10Z" fill="#a855f7" stroke={color} strokeWidth="1.2" />
          {/* Finger Knuckle Creases */}
          <line x1="9" y1="12" x2="15" y2="12" stroke={color} strokeWidth="1.5" />
          <line x1="9" y1="16" x2="15" y2="16" stroke={color} strokeWidth="1.5" />
        </svg>
      );

    case 'prison-realm':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Cubic Talisman Sealed Box */}
          <rect x="4" y="4" width="16" height="16" rx="2" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.25" />
          {/* Cursed Ocular Eye in Center */}
          <circle cx="12" cy="12" r="4" stroke="#a855f7" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="1.8" fill="#ef4444" />
          <circle cx="12" cy="12" r="0.8" fill="#ffffff" />
          {/* Seal Stitch Lines */}
          <line x1="4" y1="8" x2="20" y2="8" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
          <line x1="4" y1="16" x2="20" y2="16" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      );

    case 'domain-mudra':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Gojo Hand Sign / Infinite Void Mudra */}
          <path d="M8 21V12C8 9.5 10 8 11.5 8C13 8 14 9 14 11V21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M14 11V6C14 4.5 15.5 3.5 17 4.5C18 5.5 18 7 18 9V21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          {/* Energy Rings around Fingers */}
          <circle cx="13" cy="9" r="4.5" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="2 2" />
        </svg>
      );

    // ========================================================
    // HALLOWEEN SPOOKY GRAVEYARD
    // ========================================================
    case 'spooky-pumpkin':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Pumpkin Gourd Body */}
          <ellipse cx="12" cy="13.5" rx="8.5" ry="7.5" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.35" />
          {/* Twisted Stem */}
          <path d="M12 6C12 4 14 3 15 3.5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
          {/* Glowing Carved Eyes */}
          <polygon points="8.5,11 10,13 7,13" fill="#fbbf24" />
          <polygon points="15.5,11 17,13 14,13" fill="#fbbf24" />
          {/* Jagged Jack-O-Lantern Smile */}
          <polygon points="7.5,16 9,15 10.5,17 12,15 13.5,17 15,15 16.5,16 15,18 9,18" fill="#fbbf24" />
        </svg>
      );

    case 'spooky-ghost':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Floating Ghost Body */}
          <path
            d="M5 11C5 6.5 8.1 3 12 3C15.9 3 19 6.5 19 11V20C17.5 18.5 16 20 14.5 18.5C13 20 11 18.5 9.5 20C8 18.5 6.5 20 5 18.5V11Z"
            stroke={color}
            strokeWidth="1.8"
            fill="currentColor"
            fillOpacity="0.2"
          />
          <circle cx="9.5" cy="10" r="1.3" fill={color} />
          <circle cx="14.5" cy="10" r="1.3" fill={color} />
          <ellipse cx="12" cy="13.5" rx="1.5" ry="2" fill={color} />
        </svg>
      );

    case 'spooky-cauldron':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Witch Cauldron Pot */}
          <path d="M4 9C4 16 6.5 20 12 20C17.5 20 20 16 20 9H4Z" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.3" />
          <ellipse cx="12" cy="9" rx="8" ry="2" stroke={color} strokeWidth="1.5" fill="#10b981" />
          {/* Cauldron Feet */}
          <line x1="7" y1="19" x2="5" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="17" y1="19" x2="19" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" />
          {/* Magic Bubbles */}
          <circle cx="9" cy="5" r="1.5" stroke="#10b981" strokeWidth="1.2" fill="#34d399" />
          <circle cx="14" cy="4" r="1.2" stroke="#10b981" strokeWidth="1.2" fill="#34d399" />
        </svg>
      );

    case 'spooky-bat':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Outstretched Bat Wings */}
          <path
            d="M12 9C10 5 6 6 2 9C4 13 8 13 10 16C11 14 12 15 12 15C12 15 13 14 14 16C16 13 20 13 22 9C18 6 14 5 12 9Z"
            stroke={color}
            strokeWidth="1.8"
            fill="currentColor"
            fillOpacity="0.4"
          />
          <circle cx="10.5" cy="10.5" r="0.7" fill="#ef4444" />
          <circle cx="13.5" cy="10.5" r="0.7" fill="#ef4444" />
        </svg>
      );

    case 'spooky-tombstone':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Graveyard Tombstone Arch */}
          <path d="M5 21V10C5 6 8.5 3 12 3C15.5 3 19 6 19 10V21H5Z" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.25" />
          <line x1="3" y1="21" x2="21" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round" />
          {/* RIP Cross Inscription */}
          <line x1="12" y1="7" x2="12" y2="13" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <line x1="9.5" y1="9" x2="14.5" y2="9" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    // ========================================================
    // THE CONJURING / HORROR
    // ========================================================
    case 'annabelle-doll':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Vintage Porcelain Doll Silhouette with Pigtails */}
          <circle cx="12" cy="8" r="4.5" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.2" />
          {/* Twin Braids */}
          <path d="M7.5 7C5.5 9 5 14 6 16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M16.5 7C18.5 9 19 14 18 16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          {/* Doll Dress */}
          <path d="M9 13L6 21H18L15 13H9Z" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.3" />
          <circle cx="10.5" cy="8" r="0.9" fill="#ef4444" />
          <circle cx="13.5" cy="8" r="0.9" fill="#ef4444" />
        </svg>
      );

    case 'rocking-chair':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Spooky Rocking Chair Curved Rails */}
          <path d="M3 20C7 22 17 22 21 20" stroke={color} strokeWidth="2" strokeLinecap="round" />
          {/* Chair Legs */}
          <line x1="7" y1="14" x2="6" y2="20.5" stroke={color} strokeWidth="1.8" />
          <line x1="16" y1="14" x2="17" y2="20.5" stroke={color} strokeWidth="1.8" />
          {/* Seat & High Spindle Back */}
          <line x1="6" y1="14" x2="17" y2="14" stroke={color} strokeWidth="2" />
          <line x1="8" y1="14" x2="8" y2="4" stroke={color} strokeWidth="1.8" />
          <line x1="11" y1="14" x2="11" y2="4" stroke={color} strokeWidth="1.8" />
          <line x1="14" y1="14" x2="14" y2="4" stroke={color} strokeWidth="1.8" />
          <line x1="7" y1="4" x2="15" y2="4" stroke={color} strokeWidth="2" />
        </svg>
      );

    case 'haunted-candle':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Candle Pillar */}
          <rect x="9" y="9" width="6" height="12" rx="1" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.3" />
          {/* Wax Drips */}
          <path d="M9 12C8 13 8 14 9 15" stroke={color} strokeWidth="1.5" />
          <path d="M15 11C16 12 16 13 15 14" stroke={color} strokeWidth="1.5" />
          {/* Flickering Flame */}
          <path d="M12 2C10.5 4.5 10 6.5 12 8C14 6.5 13.5 4.5 12 2Z" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.2" />
        </svg>
      );

    case 'demon-cross':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Gothic Cross */}
          <line x1="12" y1="2" x2="12" y2="22" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
          <line x1="5" y1="16" x2="19" y2="16" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="12" cy="16" r="3" stroke={color} strokeWidth="1.5" />
        </svg>
      );

    case 'music-box':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Antique Box */}
          <rect x="4" y="9" width="16" height="11" rx="2" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.25" />
          {/* Open Lid */}
          <path d="M4 9L8 3H20L16 9" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.15" />
          {/* Winding Crank Key */}
          <circle cx="21" cy="14" r="2" stroke={color} strokeWidth="1.5" />
          <line x1="20" y1="14" x2="17" y2="14" stroke={color} strokeWidth="1.5" />
        </svg>
      );

    // ========================================================
    // MIDNIGHT DARK MODE
    // ========================================================
    case 'crescent-moon':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <circle cx="18" cy="5" r="1" fill="#fbbf24" />
          <circle cx="15" cy="8" r="0.7" fill="#fbbf24" />
        </svg>
      );

    case 'night-sky':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.2" />
          <polygon points="12,5 13.5,9 18,9 14.5,12 16,16 12,13.5 8,16 9.5,12 6,9 10.5,9" fill={color} />
        </svg>
      );

    case 'star-cluster':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="6" cy="6" r="2" fill={color} />
          <circle cx="18" cy="8" r="2.5" fill={color} />
          <circle cx="12" cy="16" r="3" fill={color} />
          <line x1="6" y1="6" x2="18" y2="8" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
          <line x1="18" y1="8" x2="12" y2="16" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      );

    case 'aurora-wave':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M2 16C6 11 10 18 14 13C18 8 20 14 22 10" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M2 19C6 14 10 21 14 16C18 11 20 17 22 13" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    case 'night-shield':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 2L4 5.5V11.5C4 16.5 7.5 21 12 22C16.5 21 20 16.5 20 11.5V5.5L12 2Z" stroke={color} strokeWidth="1.8" fill="currentColor" fillOpacity="0.25" />
          <circle cx="12" cy="12" r="3" fill={color} />
        </svg>
      );

    // ========================================================
    // CHARACTER AVATAR BADGES (For top-right header in Image 1)
    // ========================================================
    case 'avatar-doom':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <circle cx="16" cy="16" r="15" fill="#042f1f" stroke="#10b981" strokeWidth="2" />
          {/* Hood */}
          <path d="M7 25C7 16 10 8 16 8C22 8 25 16 25 25C21 27 11 27 7 25Z" fill="#065f46" stroke="#34d399" strokeWidth="1.2" />
          {/* Metal Mask Face */}
          <path d="M10 15C10 13 12 11 16 11C20 11 22 13 22 15V22C22 25 19 26 16 26C13 26 10 25 10 22V15Z" fill="#94a3b8" stroke="#334155" strokeWidth="1.2" />
          {/* Eyeslits Glowing Emerald */}
          <polygon points="11,15.5 14,16.5 12,17.5" fill="#10b981" />
          <polygon points="21,15.5 18,16.5 20,17.5" fill="#10b981" />
          {/* Mouth Grille */}
          <rect x="13.5" y="20" width="5" height="3" rx="0.5" fill="#1e293b" />
          <line x1="15" y1="20" x2="15" y2="23" stroke="#94a3b8" strokeWidth="1" />
          <line x1="17" y1="20" x2="17" y2="23" stroke="#94a3b8" strokeWidth="1" />
        </svg>
      );

    case 'avatar-spiderman':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <circle cx="16" cy="16" r="15" fill="#1e1b4b" stroke="#ef4444" strokeWidth="2" />
          {/* Spidey Mask */}
          <ellipse cx="16" cy="16" rx="9" ry="11" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
          {/* Web lines on mask */}
          <line x1="16" y1="5" x2="16" y2="27" stroke="#7f1d1d" strokeWidth="1" />
          <line x1="7" y1="16" x2="25" y2="16" stroke="#7f1d1d" strokeWidth="1" />
          {/* White Large Eyes */}
          <path d="M10 13C12 11 15 13 14 18C12 18 10 16 10 13Z" fill="#ffffff" stroke="#111827" strokeWidth="1.5" />
          <path d="M22 13C20 11 17 13 18 18C20 18 22 16 22 13Z" fill="#ffffff" stroke="#111827" strokeWidth="1.5" />
        </svg>
      );

    case 'avatar-luffy':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <circle cx="16" cy="16" r="15" fill="#450a0a" stroke="#f59e0b" strokeWidth="2" />
          {/* Straw Hat Brim */}
          <ellipse cx="16" cy="10" rx="12" ry="4" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
          <path d="M10 10C12 11 20 11 22 10" stroke="#ef4444" strokeWidth="2" />
          {/* Smiling Face */}
          <circle cx="16" cy="17" r="7" fill="#fed7aa" stroke="#ca8a04" strokeWidth="1" />
          {/* Eyes & Big D-Grin */}
          <circle cx="13" cy="16" r="1" fill="#000" />
          <circle cx="19" cy="16" r="1" fill="#000" />
          <path d="M12 19C13 22 19 22 20 19Z" fill="#ffffff" stroke="#000" strokeWidth="1" />
          {/* Left Cheek Scar */}
          <line x1="12" y1="17.5" x2="14" y2="18.5" stroke="#ef4444" strokeWidth="1" />
        </svg>
      );

    case 'avatar-jjk':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <circle cx="16" cy="16" r="15" fill="#1e1035" stroke="#a855f7" strokeWidth="2" />
          {/* Spiked White Hair */}
          <path d="M7 14L5 7L10 10L13 5L16 9L19 5L22 10L27 7L25 14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
          {/* Head & Blindfold */}
          <circle cx="16" cy="18" r="7" fill="#fed7aa" />
          <rect x="9" y="15" width="14" height="5" rx="1.5" fill="#0f172a" stroke="#a855f7" strokeWidth="1.2" />
          {/* Subtle Blue Eye Glow */}
          <circle cx="12.5" cy="17.5" r="1" fill="#38bdf8" />
          <circle cx="19.5" cy="17.5" r="1" fill="#38bdf8" />
        </svg>
      );

    case 'avatar-batman':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <circle cx="16" cy="16" r="15" fill="#09090b" stroke="#eab308" strokeWidth="2" />
          {/* Bat Cowl & Ears */}
          <path d="M10 24V14L8 6L13 11H19L24 6L22 14V24H10Z" fill="#18181b" stroke="#3f3f46" strokeWidth="1.2" />
          {/* Exposed Jaw & White Eyes */}
          <path d="M13 20H19V24H13V20Z" fill="#fed7aa" />
          <polygon points="11,14 14,15 12,16" fill="#facc15" />
          <polygon points="21,14 18,15 20,16" fill="#facc15" />
        </svg>
      );

    // ========================================================
    // OFFICIAL FLUTTER MATERIAL DESIGN ICONS (api.flutter.dev)
    // ========================================================
    case 'flutter-dashboard':
    case 'dashboard':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
          {/* Flutter: Icons.dashboard_rounded */}
          <path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0-18v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z" />
        </svg>
      );

    case 'flutter-timer':
    case 'timer':
    case 'clock':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
          {/* Flutter: Icons.timer_outlined */}
          <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
        </svg>
      );

    case 'flutter-card-giftcard':
    case 'gift':
    case 'reward':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
          {/* Flutter: Icons.card_giftcard_rounded */}
          <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.65-.5-.65C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
        </svg>
      );

    case 'flutter-menu-book':
    case 'book':
    case 'guide':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
          {/* Flutter: Icons.menu_book_rounded */}
          <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
        </svg>
      );

    case 'flutter-account-circle':
    case 'profile':
    case 'user':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
          {/* Flutter: Icons.account_circle_rounded */}
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
        </svg>
      );

    case 'flutter-self-improvement':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
          {/* Flutter: Icons.self_improvement_rounded */}
          <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
        </svg>
      );

    case 'flutter-accessibility':
    case 'activity':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
          {/* Flutter: Icons.accessibility_new_rounded */}
          <path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .83 6 1v13h2v-6h2v6h2V9c2-.17 4.14-.5 6-1l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
        </svg>
      );

    case 'flutter-spa':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
          {/* Flutter: Icons.spa_rounded */}
          <path d="M12 2c-.39 0-.76.22-.92.57C9.37 6.37 7.07 9.87 7.07 13.5c0 2.76 2.24 5 5 5 .08 0 .17-.01.25-.01.08 0 .17.01.25.01 2.76 0 5-2.24 5-5 0-3.63-2.3-7.13-3.99-10.93-.18-.35-.55-.57-.94-.57zm-1.07 14.5c-1.66 0-3-1.34-3-3 0-1.73 1.1-3.66 2.37-5.59.39.81.7 1.63.7 2.46 0 1.66-1.34 3-3 3zm4.74 0c-1.66 0-3-1.34-3-3 0-.83.31-1.65.7-2.46 1.27 1.93 2.37 3.86 2.37 5.59 0 1.66-1.34 3-3 3z" />
        </svg>
      );

    case 'flutter-work':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
          {/* Flutter: Icons.work_rounded */}
          <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
        </svg>
      );

    case 'flutter-diamond':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
          {/* Flutter: Icons.diamond_rounded */}
          <path d="M12.16 3h-.32c-.37 0-.71.2-.9.51L6.2 11.23c-.35.58-.2 1.32.32 1.73l4.63 3.65c.5.39 1.2.39 1.7 0l4.63-3.65c.53-.42.67-1.16.32-1.73L13.06 3.51c-.19-.31-.53-.51-.9-.51zM12 5.21L15.42 11H8.58L12 5.21zM8.05 13h7.9l-3.95 3.12L8.05 13z" />
        </svg>
      );

    case 'flutter-workspace-premium':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
          {/* Flutter: Icons.workspace_premium_rounded */}
          <path d="M9.68 13.69L12 11.93l2.31 1.76-.88-2.85L15.75 9h-2.84L12 6.19 11.09 9H8.25l2.31 1.84-.88 2.85zM20 10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 3.42 2.16 6.33 5.21 7.45l-.71 3.57c-.12.6.35 1.15.96 1.15.24 0 .47-.09.65-.25L12 19.34l2.89 2.58c.18.16.41.25.65.25.61 0 1.08-.55.96-1.15l-.71-3.57C17.84 16.33 20 13.42 20 10zm-8 6c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
        </svg>
      );

    case 'flutter-analytics':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
          {/* Flutter: Icons.analytics_rounded */}
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-5h2v5zm4 0h-2v-8h2v8zm4 0h-2v-3h2v3z" />
        </svg>
      );

    // Fallback minimal icons
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Flutter: Icons.circle_outlined */}
          <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" />
          <circle cx="12" cy="12" r="3" fill={color} />
        </svg>
      );
  }
};
