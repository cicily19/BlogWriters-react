import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import PostCard from '../components/PostCard';

const FavoritesPage = () => {
  const { favorites, favoritesCount } = useFavorites();

  // Update document title
  useEffect(() => {
    document.title = `Your Favorites (${favoritesCount}) - Blog Dashboard`;
  }, [favoritesCount]);

  return (
    <div className="favorites-page">
      <div className="page-header">
        <h1>Your Favorite Posts</h1>
        <p>You have {favoritesCount} favorite post{favoritesCount !== 1 ? 's' : ''}</p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <div className="empty-icon">💔</div>
          <h2>No favorites yet</h2>
          <p>Start exploring posts and add them to your favorites!</p>
          <Link to="/posts" className="browse-posts-btn">
            Browse Posts
          </Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;