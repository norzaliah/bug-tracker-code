import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getBug, addComment } from '../services/bugService';
import CommentList from '../components/CommentList';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';

const BugDetail = () => {
  const { id } = useParams();
  const [bug, setBug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchBug = async () => {
      try {
        const { data } = await getBug(id);
        setBug(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBug();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const { data } = await addComment(id, comment);
      setBug(prev => ({
        ...prev,
        comments: data
      }));
      setComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!bug) return <div className="text-center py-8">Bug not found</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold">{bug.title}</h1>
            <p className="text-gray-600">Project: {bug.project?.name}</p>
          </div>
          <div className="flex space-x-2">
            <StatusBadge status={bug.status} />
            <PriorityBadge priority={bug.priority} />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{bug.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold">Created By</h3>
            <p>{bug.createdBy?.name}</p>
            <p className="text-gray-500 text-sm">{new Date(bug.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <h3 className="font-semibold">Assigned To</h3>
            <p>{bug.assignedTo?.name || 'Unassigned'}</p>
            {bug.dueDate && (
              <p className="text-gray-500 text-sm">
                Due: {new Date(bug.dueDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        {currentUser && (
          <div className="flex space-x-3">
            <Link
              to={`/bugs/${id}/edit`}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit Bug
            </Link>
          </div>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        
        <CommentList comments={bug.comments} />
        
        {currentUser && (
          <form onSubmit={handleCommentSubmit} className="mt-6">
            <div className="mb-3">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                Add Comment
              </label>
              <textarea
                id="comment"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Post Comment
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BugDetail;