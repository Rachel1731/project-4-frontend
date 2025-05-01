import React, { useState, useEffect } from 'react';
import "./comments.css";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  
  // useEffect(() => {
  //   axios.get(`/api/comments/?movie=${movieId}`)
  //     .then(response => setComments(response.data))
  //     .catch(error => console.error(error));
  // }, [movieId]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios.post('/api/comments/', { movie: movieId, content })
  //     .then(response => {
  //       setComments([...comments, response.data]);
  //       setContent('');
  //     })
  //     .catch(error => console.error(error));
  // };


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h3>Comments</h3>
      {comments.map(comment => (
        <div key={comment.id}>
          <p>{comment.content}</p>
          <small>{comment.created_at}</small>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default Comments;
