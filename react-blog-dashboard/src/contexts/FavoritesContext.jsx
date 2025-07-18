import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (post) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === post.id)) {
        return prev; // Already in favorites
      }
      return [...prev, post];
    });
  };

  const removeFromFavorites = (postId) => {
    setFavorites(prev => prev.filter(post => post.id !== postId));
  };

  const isFavorite = (postId) => {
    return favorites.some(post => post.id === postId);
  };

  const toggleFavorite = (post) => {
    if (isFavorite(post.id)) {
      removeFromFavorites(post.id);
    } else {
      addToFavorites(post);
    }
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    favoritesCount: favorites.length
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};