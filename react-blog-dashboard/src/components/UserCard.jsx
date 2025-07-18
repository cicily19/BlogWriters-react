import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-avatar">
        {user.name.charAt(0).toUpperCase()}
      </div>
      
      <div className="user-info">
        <h3 className="user-name">
          <Link to={`/users/${user.id}`}>
            {user.name}
          </Link>
        </h3>
        <p className="user-username">@{user.username}</p>
        <p className="user-email">{user.email}</p>
        
        {user.company && (
          <p className="user-company">
            Works at {user.company.name}
          </p>
        )}
        
        {user.address && (
          <p className="user-location">
            📍 {user.address.city}
          </p>
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
  );
};

export default UserCard;