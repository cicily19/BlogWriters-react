import { useState, useEffect, useMemo } from 'react';
import { usePosts, useUsers } from '../hooks/useApi';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorMessage from '../components/ErrorMessage';
import { useNotification } from '../contexts/NotificationContext';

const PostsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  const { data: posts, isLoading, error, refetch } = usePosts();
  const { data: users } = useUsers();
  const { showSuccess, showError } = useNotification();

  // Update document title
  useEffect(() => {
    document.title = `Blog Dashboard - Posts (Page ${currentPage})`;
  }, [currentPage]);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    if (!posts) return [];

    let filtered = posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.body.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesUser = !selectedUser || post.userId.toString() === selectedUser;
      return matchesSearch && matchesUser;
    });

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'userId':
          return a.userId - b.userId;
        case 'id':
        default:
          return a.id - b.id;
      }
    });

    return filtered;
  }, [posts, searchTerm, selectedUser, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredAndSortedPosts.slice(startIndex, startIndex + postsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedUser, sortBy]);

  if (isLoading) return (
    <div className="posts-page">
      <div className="page-header">
        <h1>All Posts</h1>
        <p>Loading amazing blog posts...</p>
      </div>
      <div className="posts-grid">
        <SkeletonLoader type="post" count={6} />
      </div>
    </div>
  );
  if (error) return <ErrorMessage message="Failed to load posts" onRetry={refetch} />;

  return (
    <div className="posts-page">
      <div className="page-header">
        <h1>All Posts</h1>
        <p>Discover {posts?.length || 0} amazing blog posts</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search posts by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="clear-search"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="filter-controls">
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="user-filter"
          >
            <option value="">All Authors</option>
            {users?.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="id">Latest First</option>
            <option value="title">A-Z Title</option>
            <option value="userId">By Author</option>
          </select>
        </div>
      </div>

      <div className="results-info">
        <p>Showing {currentPosts.length} of {filteredAndSortedPosts.length} posts</p>
      </div>

      {currentPosts.length === 0 ? (
        <div className="no-results">
          <p>No posts found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className="posts-grid">
            {currentPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostsPage;