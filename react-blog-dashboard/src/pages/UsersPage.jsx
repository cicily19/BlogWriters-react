import { useState, useEffect, useMemo } from 'react';
import { useUsers } from '../hooks/useApi';
import UserCard from '../components/UserCard';
import LoadingSpinner from '../components/LoadingSpinner';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorMessage from '../components/ErrorMessage';

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  
  const { data: users, isLoading, error, refetch } = useUsers();

  // Update document title
  useEffect(() => {
    document.title = 'Writers - Blog Dashboard';
  }, []);

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    if (!users) return [];

    let filtered = users.filter(user => {
      const searchLower = searchTerm.toLowerCase();
      return user.name.toLowerCase().includes(searchLower) ||
             user.username.toLowerCase().includes(searchLower) ||
             user.email.toLowerCase().includes(searchLower) ||
             (user.company && user.company.name.toLowerCase().includes(searchLower));
    });

    // Sort users
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'username':
          return a.username.localeCompare(b.username);
        case 'email':
          return a.email.localeCompare(b.email);
        case 'company':
          return (a.company?.name || '').localeCompare(b.company?.name || '');
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [users, searchTerm, sortBy]);

  if (isLoading) return (
    <div className="users-page">
      <div className="page-header">
        <h1>Meet Our Writers</h1>
        <p>Loading talented writers...</p>
      </div>
      <div className="users-grid">
        <SkeletonLoader type="user" count={4} />
      </div>
    </div>
  );
  if (error) return <ErrorMessage message="Failed to load writers" onRetry={refetch} />;

  return (
    <div className="users-page">
      <div className="page-header">
        <h1>Meet Our Writers</h1>
        <p>Discover {users?.length || 0} talented writers sharing their thoughts</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <div className="search-input-wrapper">
            <span className="search-icon">👤</span>
            <input
              type="text"
              placeholder="Search writers by name, username, or company..."
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
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="name">Sort by Name</option>
            <option value="username">Sort by Username</option>
            <option value="email">Sort by Email</option>
            <option value="company">Sort by Company</option>
          </select>
        </div>
      </div>

      <div className="results-info">
        <p>Showing {filteredAndSortedUsers.length} writer{filteredAndSortedUsers.length !== 1 ? 's' : ''}</p>
      </div>

      {filteredAndSortedUsers.length === 0 ? (
        <div className="no-results">
          <p>No writers found matching your search.</p>
        </div>
      ) : (
        <div className="users-grid">
          {filteredAndSortedUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersPage;