import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./comments.css";

const Comments = ({ movieId }) => {
  // Local state
  const [comments, setComments] = useState([]);
  const [content, setContent]   = useState('');
  const [movies, setMovies]     = useState([]);
  const [user, setUser]         = useState('');
  const [notify, setNotify]     = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(movieId || '');

  // Fetch list of movies for the dropdown
  useEffect(() => {
    axios
      .get('http://3.83.236.184:8000/api/movies/')
      .then(res => {
        console.log('Fetched movies:', res.data);
        setMovies(res.data);
      })
      .catch(err => console.error('Error fetching movies:', err));
  }, []);

  // Handle comment submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://127.0.0.1:8000/api/comments/', {
        movie: movieId,
        content: content,   
        user: user,
        notify     
      })
      .then(res => {
        console.log('Comment added:', res.data);
        setComments(prev => [...prev, res.data]);
        setContent('');
        setUser('');
        setNotify(false);
      })
      .catch(err => console.error('Error adding comment:', err));
  };

  // Preview functionality
  const handlePreview = () => {
    console.log('Preview comment:', { movie: movieId, content, user, notify });
  };

  console.log('Rendering Comments:', { movies, movieId });

  return (
    <div className="card bg-dark text-light my-4 p-4">
      {/* Movie selector */}
      <label>Related Movie:</label>
      <select
        name={selectedMovieId}
        value={movieId || ''}
        onChange={e => setSelectedMovieId(e.target.value)}
        className="form-control mb-3"
      >
        <option value="">None</option>
        {movies.map(m => (
          <option key={m.id} value={m.id}>{m.title}</option>
        ))}
      </select>

      {/* Navigation & comment count */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <a href="#" className="text-secondary">Back to the post list</a>
        <span>{comments.length} comments have been posted.</span>
      </div>

      {/* Comment form */}
      <h3 className="mb-3">Post your comment</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <textarea
            id="commentContent"
            rows="4"
            className="form-control bg-secondary border-0 text-light"
            placeholder="Your comment"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <input
            type="text"
            id="commentName"
            className="form-control bg-secondary border-0 text-light"
            placeholder="Your name"
            value={user}
            onChange={e => setUser(e.target.value)}
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="notifyCheckbox"
            className="form-check-input"
            checked={notify}
            onChange={e => setNotify(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="notifyCheckbox">
            Notify me about follow-up comments
          </label>
        </div>

        <div className="d-flex mb-3">
          <button type="submit" className="btn btn-primary me-2">Send</button>
          <button type="button" className="btn btn-secondary" onClick={handlePreview}>Preview</button>
        </div>
      </form>

      <hr className="my-4 border-secondary" />

      {/* Display existing comments */}
      <h4 className="mb-3">Comments ({comments.length})</h4>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <div className="comments-list">
          {comments.map(c => (
            <div key={c.id} className="card bg-secondary text-light mb-3 p-3">
              <p className="card-text mb-1">{c.content}</p>
              <p className="card-text mb-1"><small><strong>By:</strong> {c.user_name || 'Anonymous'}</small></p>
              <p className="card-text"><small className="text-muted">
                Posted on: {new Date(c.created_at).toLocaleString()}
              </small></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
