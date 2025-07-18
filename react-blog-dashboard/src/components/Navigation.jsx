import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { favoritesCount } = useFavorites();

  const isActive = (path) => location.pathname === path;
  
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          📝 Blog Dashboard
        </Link>
        
        {/* Desktop Navigation */}
        <div className="nav-menu desktop-menu">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/posts" 
            className={`nav-link ${isActive('/posts') ? 'active' : ''}`}
          >
            Posts
          </Link>
          <Link 
            to="/users" 
            className={`nav-link ${isActive('/users') ? 'active' : ''}`}
          >
            Users
          </Link>
          <Link 
            to="/favorites" 
            className={`nav-link ${isActive('/favorites') ? 'active' : ''}`}
          >
            Favorites {favoritesCount > 0 && <span className="badge">{favoritesCount}</span>}
          </Link>
        </div>

        <div className="nav-actions">
          <button 
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="mobile-menu-btn"
            aria-label="Toggle mobile menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <Link 
            to="/" 
            className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            🏠 Home
          </Link>
          <Link 
            to="/posts" 
            className={`mobile-nav-link ${isActive('/posts') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            📚 Posts
          </Link>
          <Link 
            to="/users" 
            className={`mobile-nav-link ${isActive('/users') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            👥 Users
          </Link>
          <Link 
            to="/favorites" 
            className={`mobile-nav-link ${isActive('/favorites') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            ❤️ Favorites {favoritesCount > 0 && <span className="mobile-badge">{favoritesCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;