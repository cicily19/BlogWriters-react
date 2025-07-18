import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser, useUserPosts } from '../hooks/useApi';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const UserProfilePage = () => {
  const { id } = useParams();
  const { data: user, isLoading: userLoading, error: userError } = useUser(id);
  const { data: userPosts, isLoading: postsLoading, error: postsError } = useUserPosts(id);

  // Update document title
  useEffect(() => {
    if (user) {
      document.title = `${user.name} - Blog Dashboard`;
    }
  }, [user]);

  if (userLoading) return <LoadingSpinner message="Loading user profile..." />;
  if (userError) return <ErrorMessage message="Failed to load user profile" />;
  if (!user) return <ErrorMessage message="User not found" />;

  return (
    <div className="user-profile-page">
      <div className="profile-header">
        <div className="breadcrumb">
          <Link to="/users">← Back to Writers</Link>
        </div>
        
        <div className="user-info">
          <div className="user-avatar large">
            {user.name.charAt(0).toUpperCase()}
          </div>
          
          <div className="user-details">
            <h1 className="user-name">{user.name}</h1>
            <p className="user-username">@{user.username}</p>
            <p className="user-email">📧 {user.email}</p>
            
            {user.phone && (
              <p className="user-phone">📞 {user.phone}</p>
            )}
            
            {user.website && (
              <a 
                href={`https://${user.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="user-website"
              >
                🌐 {user.website}
              </a>
            )}
          </div>
        </div>
      </div>

      {user.address && (
        <div className="user-address">
          <h3>📍 Location</h3>
          <p>
            {user.address.street}, {user.address.suite}<br />
            {user.address.city}, {user.address.zipcode}
          </p>
        </div>
      )}

      {user.company && (
        <div className="user-company">
          <h3>🏢 Company</h3>
          <p><strong>{user.company.name}</strong></p>
          <p>{user.company.catchPhrase}</p>
          <p><em>{user.company.bs}</em></p>
        </div>
      )}

      <div className="user-posts-section">
        <h2>Posts by {user.name}</h2>
        
        {postsLoading ? (
          <LoadingSpinner message="Loading posts..." />
        ) : postsError ? (
          <ErrorMessage message="Failed to load user posts" />
        ) : !userPosts || userPosts.length === 0 ? (
          <p className="no-posts">This user hasn't written any posts yet.</p>
        ) : (
          <>
            <p className="posts-count">{userPosts.length} post{userPosts.length !== 1 ? 's' : ''}</p>
            <div className="posts-grid">
              {userPosts.map(post => (
                <PostCard key={post.id} post={post} showAuthor={false} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;