import { useMemo } from 'react';


export const useBasePath = () => {
  const isProduction = useMemo(() => {
    return window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
  }, []);

  const basePath = isProduction ? '/Portfolio' : '';

  const getAssetPath = (path) => {
    return `${basePath}${path.startsWith('/') ? path : `/${path}`}`;
  };

  const getImagePath = (imageName) => {
    return `${basePath}/src/assets/images/${imageName}`;
  };

  return {
    isProduction,
    basePath,
    getAssetPath,
    getImagePath
  };
};