import React, { useState } from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackCategory?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt = '',
  className = '',
  fallbackTitle,
  fallbackCategory,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-forest-950 via-forest-900 to-forest-950 text-ivory-100 ${className}`}
      >
        <div className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center mb-3">
          <svg
            className="w-6 h-6 text-gold-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 21h18M4 18h16M6 18V8l6-5 6 5v10M9 18v-5a3 3 0 0 1 6 0v5" />
          </svg>
        </div>
        {fallbackCategory && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 mb-1">
            {fallbackCategory}
          </span>
        )}
        <span className="font-serif text-lg font-semibold text-ivory-50 max-w-xs">
          {fallbackTitle || alt || 'Sivasagar Historical Heritage'}
        </span>
        <span className="text-[11px] text-ivory-300/70 mt-1">
          Explore Sivasagar Archives
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 bg-forest-900/60 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-500`}
        {...props}
      />
    </div>
  );
};

