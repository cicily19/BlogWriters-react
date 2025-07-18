import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePost, useUser } from '../hooks/useApi';
import { useFavorites } from '../contexts/FavoritesContext';
import CommentList from '../components/CommentList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const PostDetailPage = () => {
  const { id } = useParams();
  const { data: post, isLoading: postLoading, error: postError } = usePost(id);
  const { data: author, isLoading: authorLoading } = useUser(post?.userId);
  const { isFavorite, toggleFavorite } = useFavorites();

  // Update document title
  useEffect(() => {
    if (post) {
      document.title = `${post.title} - Blog Dashboard`;
    }
  }, [post]);

  if (postLoading || authorLoading) return <LoadingSpinner message="Loading post..." />;
  if (postError) return <ErrorMessage message="Failed to load post" />;
  if (!post) return <ErrorMessage message="Post not found" />;

  const handleFavoriteClick = () => {
    toggleFavorite(post);
  };

  return (
    <div className="post-detail-page">
      <div className="post-header">
        <div className="breadcrumb">
          <Link to="/posts">← Back to Posts</Link>
        </div>
        
        <div className="post-meta">
          <h1 className="post-title">{post.title}</h1>
          
          {author && (
            <div className="author-info">
              <Link to={`/users/${author.id}`} className="author-link">
                <div className="author-avatar">
                  {author.name.charAt(0).toUpperCase()}
                </div>
                <div className="author-details">
                  <span className="author-name">{author.name}</span>
                  <span className="author-username">@{author.username}</span>
                </div>
              </Link>
            </div>
          )}
          
          <button 
            onClick={handleFavoriteClick}
            className={`favorite-btn large ${isFavorite(post.id) ? 'favorited' : ''}`}
            aria-label={isFavorite(post.id) ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite(post.id) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </button>
        </div>
      </div>

      <div className="post-content">
        <div className="post-body">
          {post.body.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="post-actions">
        {author && (
          <Link to={`/users/${author.id}`} className="view-author-btn">
            View More Posts by {author.name}
          </Link>
        )}
      </div>

      <CommentList postId={post.id} />
    </div>
  );
};

export default PostDetailPage;