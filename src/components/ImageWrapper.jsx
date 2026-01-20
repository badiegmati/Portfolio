import React from 'react';

const ImageWrapper = ({ src, alt, className, ...props }) => {
  // Si c'est une importation directe, utilisez-la directement
  if (typeof src === 'string' && src.startsWith('data:')) {
    return <img src={src} alt={alt} className={className} {...props} />;
  }
  
  // Sinon, ajustez le chemin pour la production
  const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
  const basePath = isProduction ? '/Portfolio' : '';
  const finalSrc = typeof src === 'string' ? `${basePath}${src}` : src;
  
  return <img src={finalSrc} alt={alt} className={className} {...props} />;
};

export default ImageWrapper;