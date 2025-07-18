const SkeletonLoader = ({ type = 'post', count = 1 }) => {
  const renderPostSkeleton = () => (
    <div className="post-card">
      <div className="post-card-header">
        <div className="skeleton skeleton-text large" style={{ width: '80%' }}></div>
        <div className="skeleton" style={{ width: '24px', height: '24px', borderRadius: '50%' }}></div>
      </div>
      <div className="skeleton skeleton-text" style={{ width: '100%' }}></div>
      <div className="skeleton skeleton-text" style={{ width: '90%' }}></div>
      <div className="skeleton skeleton-text" style={{ width: '70%' }}></div>
      <div style={{ marginTop: '1rem' }}>
        <div className="skeleton skeleton-text" style={{ width: '40%' }}></div>
      </div>
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="skeleton skeleton-text" style={{ width: '30%' }}></div>
        <div className="skeleton skeleton-text" style={{ width: '25%' }}></div>
      </div>
    </div>
  );

  const renderUserSkeleton = () => (
    <div className="user-card">
      <div className="skeleton skeleton-avatar" style={{ width: '64px', height: '64px', borderRadius: '50%' }}></div>
      <div className="user-info" style={{ flex: 1 }}>
        <div className="skeleton skeleton-text large" style={{ width: '60%', marginBottom: '0.5rem' }}></div>
        <div className="skeleton skeleton-text" style={{ width: '40%', marginBottom: '0.5rem' }}></div>
        <div className="skeleton skeleton-text" style={{ width: '70%', marginBottom: '0.5rem' }}></div>
        <div className="skeleton skeleton-text" style={{ width: '50%' }}></div>
      </div>
    </div>
  );

  const renderCommentSkeleton = () => (
    <div className="comment">
      <div className="comment-header" style={{ marginBottom: '0.75rem' }}>
        <div className="skeleton skeleton-text" style={{ width: '30%' }}></div>
        <div className="skeleton skeleton-text" style={{ width: '40%' }}></div>
      </div>
      <div className="skeleton skeleton-text" style={{ width: '100%' }}></div>
      <div className="skeleton skeleton-text" style={{ width: '85%' }}></div>
      <div className="skeleton skeleton-text" style={{ width: '60%' }}></div>
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'user':
        return renderUserSkeleton();
      case 'comment':
        return renderCommentSkeleton();
      case 'post':
      default:
        return renderPostSkeleton();
    }
  };

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;