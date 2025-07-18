# React Blog Dashboard

A modern, responsive blog dashboard application built with React 19, featuring post browsing, user profiles, favorites management, and dark/light theme switching. This project demonstrates proficiency in modern React development patterns and state management.

## 🚀 Features

### Core Functionality
- **📚 Post Management**: Browse, search, and filter blog posts
- **👥 User Profiles**: View user information and their posts
- **❤️ Favorites System**: Save and manage favorite posts
- **🌙 Theme Switching**: Toggle between light and dark modes
- **📱 Responsive Design**: Optimized for all device sizes
- **🔍 Advanced Search**: Search posts by title, content, and author

### Technical Features
- **React Query**: Efficient data fetching with caching and error handling
- **Context API**: Global state management for themes, favorites, and notifications
- **React Router**: Client-side routing with dynamic pages
- **Local Storage**: Persistent user preferences
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: Graceful error recovery with retry options
- **Notifications**: Toast notifications for user feedback

## 🛠️ Technology Stack

- **React 19.1.0** - Modern React with latest features
- **React Router DOM 7.7.0** - Client-side routing
- **TanStack React Query 5.83.0** - Server state management
- **Vite 7.0.4** - Fast build tool and dev server
- **JSONPlaceholder API** - Mock REST API for demo data
- **CSS Variables** - Theme system with CSS custom properties

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.jsx   # Main navigation bar
│   ├── PostCard.jsx     # Post display component
│   ├── UserCard.jsx     # User profile card
│   ├── CommentList.jsx  # Comments display
│   ├── LoadingSpinner.jsx
│   ├── ErrorMessage.jsx
│   └── NotificationToast.jsx
├── contexts/            # React Context providers
│   ├── ThemeContext.jsx      # Light/dark theme management
│   ├── FavoritesContext.jsx  # Favorites state management
│   └── NotificationContext.jsx # Toast notifications
├── hooks/               # Custom React hooks
│   └── useApi.js        # API data fetching hooks
├── pages/               # Route components
│   ├── HomePage.jsx     # Dashboard overview
│   ├── PostsPage.jsx    # All posts with filtering
│   ├── PostDetailPage.jsx # Individual post view
│   ├── UsersPage.jsx    # User directory
│   ├── UserProfilePage.jsx # User profile details
│   └── FavoritesPage.jsx # Saved posts
├── services/            # API service functions
│   └── api.js          # JSONPlaceholder API calls
├── App.jsx             # Main app component
├── App.css             # Global styles and theme variables
└── main.jsx            # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd react-blog-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Implementation Details

### State Management Architecture

**Context API Usage:**
```javascript
// Theme Context - Light/dark mode with localStorage persistence
const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

// Favorites Context - Manage favorite posts with localStorage
const FavoritesContext = createContext();
export const useFavorites = () => useContext(FavoritesContext);

// Notification Context - Toast notification system
const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);
```

**React Query Integration:**
```javascript
// Custom hooks for API data fetching with caching
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};
```

### Hook Usage Examples

**useState Examples:**
- Search/filter input states
- Modal open/close states  
- Pagination current page
- Loading states for UI feedback

**useEffect Examples:**
- Document title updates on route changes
- localStorage synchronization for themes/favorites
- Cleanup subscriptions
- Side effects on component mount/unmount

### API Integration

The app integrates with JSONPlaceholder API endpoints:
- `GET /posts` - Fetch all blog posts
- `GET /posts/:id` - Fetch individual post
- `GET /posts/:id/comments` - Fetch post comments
- `GET /users` - Fetch all users
- `GET /users/:id` - Fetch user details
- `GET /users/:id/posts` - Fetch user's posts

## 🎨 Design Features

### Theme System
- CSS custom properties for consistent theming
- Automatic theme persistence in localStorage
- Smooth transitions between themes
- Support for system preference detection

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Adaptive navigation
- Touch-friendly interactions

### User Experience
- Loading skeletons for better perceived performance
- Error boundaries with retry functionality
- Optimistic UI updates
- Keyboard navigation support

## 📊 Performance Optimizations

- **React Query Caching**: 5-minute stale time, 10-minute cache time
- **Component Memoization**: Optimized re-renders
- **Lazy Loading**: Code splitting for routes
- **Image Optimization**: Responsive images
- **Bundle Optimization**: Vite's built-in optimizations

## 🧪 Testing Considerations

The application is structured for easy testing with:
- Separated business logic in custom hooks
- Pure components with clear props
- Context providers for easy mocking
- API service layer for endpoint testing

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

## 🔮 Future Enhancements

### Bonus Features (Extra Credit)
- **Authentication**: Simulated login/logout system
- **Post Creation**: Add/edit posts with optimistic updates
- **Advanced Filtering**: Date ranges, multiple criteria
- **Keyboard Shortcuts**: Navigation shortcuts
- **PWA Features**: Offline support, installability
- **Real-time Updates**: WebSocket integration
- **Infinite Scroll**: Better pagination UX

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for the mock API
- [React](https://reactjs.org/) team for the amazing framework
- [TanStack Query](https://tanstack.com/query) for excellent data fetching
- [Vite](https://vitejs.dev/) for the lightning-fast build tool

---

**Built with ❤️ using React, demonstrating modern web development best practices.**
