// useBasePath.js — aucune modification nécessaire
// Ce fichier est correct et peu coûteux
import { useMemo } from 'react'

export const useBasePath = () => {
  const isProduction = useMemo(() => {
    return (
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1'
    )
  }, [])

  const basePath = isProduction ? '/Portfolio' : ''

  const getAssetPath = (path) =>
    `${basePath}${path.startsWith('/') ? path : `/${path}`}`

  const getImagePath = (imageName) =>
    `${basePath}/src/assets/images/${imageName}`

  return { isProduction, basePath, getAssetPath, getImagePath }
}