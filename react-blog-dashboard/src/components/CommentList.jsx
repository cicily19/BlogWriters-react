import { usePostComments } from '../hooks/useApi';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const CommentList = ({ postId }) => {
  const { data: comments, isLoading, error } = usePostComments(postId);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load comments" />;
  if (!comments || comments.length === 0) {
    return <p className="no-comments">No comments yet.</p>;
  }

  return (
    <div className="comments-section">
      <h3 className="comments-title">Comments ({comments.length})</h3>
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <strong className="comment-name">{comment.name}</strong>
              <span className="comment-email">({comment.email})</span>
            </div>
            <p className="comment-body">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;