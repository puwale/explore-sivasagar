import React, { useState, useRef, useEffect } from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackCategory?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt = '',
  className = '',
  fallbackTitle: _fallbackTitle,
  fallbackCategory: _fallbackCategory,
  onError,
  onLoad,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const resolvedSrc =
    src && src.startsWith('/') && !src.startsWith(import.meta.env.BASE_URL)
      ? `${import.meta.env.BASE_URL}${src.slice(1)}`
      : src;

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [resolvedSrc]);

  // Never render a placeholder card, skeleton, or fallback UI
  if (hasError || !resolvedSrc) {
    return null;
  }

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      {!isLoaded && (
        <div className="absolute inset-0 bg-forest-900/40" />
      )}
      <img
        ref={imgRef}
        src={resolvedSrc}
        alt={alt}
        loading={props.loading || 'lazy'}
        referrerPolicy="no-referrer"
        onLoad={(e) => {
          setIsLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setHasError(true);
          onError?.(e);
        }}
        className={`${className} ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
        {...props}
      />
    </div>
  );
};
