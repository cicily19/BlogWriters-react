import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePosts, useUsers } from '../hooks/useApi';
import { useFavorites } from '../contexts/FavoritesContext';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorMessage from '../components/ErrorMessage';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: posts, isLoading: postsLoading, error: postsError } = usePosts();
  const { data: users, isLoading: usersLoading } = useUsers();
  const { favoritesCount } = useFavorites();

  // Update document title
  useEffect(() => {
    document.title = `Blog Dashboard - Home`;
  }, []);

  if (postsLoading || usersLoading) return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to Blog Dashboard</h1>
        <p>Loading amazing content...</p>
      </div>
      <div className="stats-section">
        <div className="stat-card">
          <div className="skeleton skeleton-text large" style={{ width: '60%', margin: '0 auto 0.5rem' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '40%', margin: '0 auto' }}></div>
        </div>
        <div className="stat-card">
          <div className="skeleton skeleton-text large" style={{ width: '60%', margin: '0 auto 0.5rem' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '40%', margin: '0 auto' }}></div>
        </div>
        <div className="stat-card">
          <div className="skeleton skeleton-text large" style={{ width: '60%', margin: '0 auto 0.5rem' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '40%', margin: '0 auto' }}></div>
        </div>
      </div>
      <section className="recent-posts">
        <div className="section-header">
          <h2>Recent Posts</h2>
        </div>
        <div className="posts-grid">
          <SkeletonLoader type="post" count={6} />
        </div>
      </section>
    </div>
  );
  if (postsError) return <ErrorMessage message="Failed to load posts" />;

  const recentPosts = posts?.slice(0, 6) || [];
  const totalPosts = posts?.length || 0;
  const totalUsers = users?.length || 0;

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to Blog Dashboard</h1>
        <p>Discover amazing blog posts and connect with writers from around the world.</p>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <h3>{totalPosts}</h3>
          <p>Total Posts</p>
        </div>
        <div className="stat-card">
          <h3>{totalUsers}</h3>
          <p>Writers</p>
        </div>
        <div className="stat-card">
          <h3>{favoritesCount}</h3>
          <p>Your Favorites</p>
        </div>
      </div>

      <section className="recent-posts">
        <div className="section-header">
          <h2>Recent Posts</h2>
          <Link to="/posts" className="view-all-link">
            View All Posts →
          </Link>
        </div>
        
        <div className="posts-grid">
          {recentPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/posts" className="action-btn">
            📚 Browse All Posts
          </Link>
          <Link to="/users" className="action-btn">
            👥 Meet the Writers
          </Link>
          <Link to="/favorites" className="action-btn">
            ❤️ Your Favorites
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;