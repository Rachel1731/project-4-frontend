import React, { useState, useEffect } from 'react';
import "./comments.css";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  
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
