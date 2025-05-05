import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./comments.css";

// --- Configuration ---
const YOUR_APP_LABEL = 'books_movies_api';  // Django app name
const API_BASE_URL = 'https://pageandpicture.duckdns.org/api/';

function Comments() {
  // --- State Hooks ---
  const [books, setBooks] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loadingObjects, setLoadingObjects] = useState(true);
  const [objectError, setObjectError] = useState(null);

  const [bookContentTypeId, setBookContentTypeId] = useState(null);
  const [movieContentTypeId, setMovieContentTypeId] = useState(null);
  const [loadingContentTypes, setLoadingContentTypes] = useState(true);
  const [contentTypeError, setContentTypeError] = useState(null);

  const [selectedObjectType, setSelectedObjectType] = useState('movie');
  const [selectedObjectId, setSelectedObjectId] = useState('');

  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState(null);

  const [content, setContent] = useState('');
  const [userName, setUserName] = useState('');
  const [notify, setNotify] = useState(false);

  const objectList = selectedObjectType === 'book' ? books : movies;
  const objectLabel = selectedObjectType === 'book' ? 'Book' : 'Movie';

  // --- Effects ---
  useEffect(() => {
    setLoadingObjects(true);
    setObjectError(null);
    axios.all([
      axios.get(`${API_BASE_URL}books/`),
      axios.get(`${API_BASE_URL}movies/`)
    ])
    .then(axios.spread((bRes, mRes) => {
      setBooks(bRes.data);
      setMovies(mRes.data);
    }))
    .catch(err => setObjectError('Failed to load books and movies.'))
    .finally(() => setLoadingObjects(false));
  }, []);

  useEffect(() => {
    setLoadingContentTypes(true);
    setContentTypeError(null);
    axios.get(`${API_BASE_URL}contenttypes/`)
      .then(res => {
        const bookCt = res.data.find(ct => ct.app_label === YOUR_APP_LABEL && ct.model === 'book');
        const movieCt = res.data.find(ct => ct.app_label === YOUR_APP_LABEL && ct.model === 'movie');
        if (bookCt) setBookContentTypeId(bookCt.id);
        if (movieCt) setMovieContentTypeId(movieCt.id);
        if (!bookCt || !movieCt) setContentTypeError('Missing content types for Book or Movie');
      })
      .catch(err => setContentTypeError('Failed to load content types'))
      .finally(() => setLoadingContentTypes(false));
  }, []);

  useEffect(() => {
    const ctId = selectedObjectType === 'book' ? bookContentTypeId : movieContentTypeId;
    if (selectedObjectId && ctId != null) {
      setLoadingComments(true);
      setCommentsError(null);
      axios.get(`${API_BASE_URL}comments/?content_type=${ctId}&object_pk=${selectedObjectId}`)
        .then(res => setComments(res.data))
        .catch(err => setCommentsError('Failed to load comments'))
        .finally(() => setLoadingComments(false));
    } else {
      setComments([]);
    }
  }, [selectedObjectType, selectedObjectId, bookContentTypeId, movieContentTypeId]);

  // --- Handlers ---
  const handleTypeChange = e => {
    setSelectedObjectType(e.target.value);
    setSelectedObjectId('');
    setComments([]);
  };

  const handleObjectChange = e => setSelectedObjectId(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    const ctId = selectedObjectType === 'book' ? bookContentTypeId : movieContentTypeId;
    if (!selectedObjectId) return alert(`Select a ${objectLabel}`);
    if (!content.trim()) return alert('Enter your comment');

    const payload = {
      object_pk: String(selectedObjectId),
      content_type: ctId,
      content_type_model: selectedObjectType,
      app_label: YOUR_APP_LABEL,
      comment:content.trim(),
      content: content.trim(),
      user_name: userName.trim(),
      notify:false,
    };

    axios.post(`${API_BASE_URL}comments/`, payload)
      .then(res => {
        setComments(prev => [...prev, res.data]);
        setContent(''); setUserName(''); setNotify(false);
      })
      .catch(err => alert(`Failed to post comment: ${err.response?.data?.detail || err.message}`));
  };

  const handlePreview = () => alert(`Preview:\n${content}\nName: ${userName || 'Anon'}`);

  // --- Render ---
  if (loadingObjects || loadingContentTypes) return <div>Loading...</div>;
  if (objectError) return <div className="text-danger">{objectError}</div>;
  if (contentTypeError) return <div className="text-danger">{contentTypeError}</div>;

  return (
    <div className="card bg-dark text-light p-4 my-4">
      <h2>Comments</h2>

      <div className="mb-3">
        <select value={selectedObjectType} onChange={handleTypeChange}>
          <option value="movie">Movie</option>
          <option value="book">Book</option>
        </select>
        <select value={selectedObjectId} onChange={handleObjectChange} disabled={!objectList.length}>
          <option value="">-- Select {objectLabel} --</option>
          {objectList.map(o => <option key={o.id} value={o.id}>{o.title}</option>)}
        </select>
      </div>

      {selectedObjectId ? (
        <form onSubmit={handleSubmit}>
          <textarea
            rows={4}
            placeholder="Your comment"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="form-control mb-2"
            required
          />
          <input
            type="text"
            placeholder="Your name (optional)"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            className="form-control mb-2"
          />
          <div className="form-check mb-2">
            <input
              type="checkbox"
              id="notifyCheckbox"
              className="form-check-input"
              checked={notify}
              onChange={e => setNotify(e.target.checked)}
            />
            <label htmlFor="notifyCheckbox" className="form-check-label">
              Notify me about follow-up comments
            </label>
          </div>
          <button type="submit" className="btn btn-primary me-2" disabled={!content.trim()}>
            Send
          </button>
          <button type="button" className="btn btn-secondary" onClick={handlePreview}>
            Preview
          </button>
        </form>
      ) : (
        <p>Select a {objectLabel} above to post a comment.</p>
      )}

      {selectedObjectId && (
        <div>
          <h4 className="mt-4">Comments ({comments.length})</h4>
          {loadingComments && <p>Loading comments...</p>}
          {commentsError && <p className="text-danger">{commentsError}</p>}
          {comments.map(c => (
            <div key={c.id} className="card bg-secondary text-light p-2 mb-2">
              <p>{c.content}</p>
              <small>By {c.user_name || 'Anonymous'}</small>
              <br />
              <small className="text-muted">{new Date(c.created_at).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comments;
