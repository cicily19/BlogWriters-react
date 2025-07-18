import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { useUsers } from '../hooks/useApi';

const PostCard = ({ post, showAuthor = true }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { data: users } = useUsers();
  
  const author = users?.find(user => user.id === post.userId);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(post);
  };

  return (
    <div className="post-card">
      <div className="post-card-header">
        <h3 className="post-title">
          <Link to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </h3>
        <button 
          onClick={handleFavoriteClick}
          className={`favorite-btn ${isFavorite(post.id) ? 'favorited' : ''}`}
          aria-label={isFavorite(post.id) ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite(post.id) ? '❤️' : '🤍'}
        </button>
      </div>
      
      <p className="post-body">
        {post.body.length > 150 ? `${post.body.substring(0, 150)}...` : post.body}
      </p>
      
      {showAuthor && author && (
        <div className="post-author">
          <Link to={`/users/${author.id}`} className="author-link">
            By {author.name} (@{author.username})
          </Link>
        </div>
      )}
      
      <div className="post-actions">
        <Link to={`/posts/${post.id}`} className="read-more-btn">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;