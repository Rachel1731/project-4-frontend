import React, { useState, useEffect } from 'react';
import "./comments.css";

const Comments = ({ movieId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [name, setName] = useState(''); // State for name field
  const [email, setEmail] = useState(''); // State for email field
  const [link, setLink] = useState(''); // State for link field
  const [notify, setNotify] = useState(false); // State for notify checkbox

  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Keep commented out for reference, assuming you'll uncomment and adjust this later
    // const newComment = {
    //   movie: movieId, // Ensure movieId is passed as a prop
    //   content: content,
    //   name: name, // Include name
    //   email: email, // Include email
    //   link: link, // Include link
    //   // You might need to add notify if your backend handles it
    // };

    // try {
    //   const response = await fetch('/api/comments/', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(newComment),
    //   });
    //   if (response.ok) {
    //     const addedComment = await response.json();
    //     setComments([...comments, addedComment]);
    //     // Clear form fields after successful submission
    //     setContent('');
    //     setName('');
    //     setEmail('');
    //     setLink('');
    //     setNotify(false);
    //   } else {
    //     console.error('Failed to add comment');
    //   }
    // } catch (error) {
    //   console.error('Error adding comment:', error);
    // }

    // Placeholder for handling form submission data if backend is not hooked up yet
    console.log('Comment submitted:', { content, name, email, link, notify });
    // Clear form fields (optional, depends on desired behavior after placeholder submit)
    // setContent('');
    // setName('');
    // setEmail('');
    // setLink('');
    // setNotify(false);
  };


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  const handlePreview = () => {
    // Placeholder for preview functionality
    console.log('Preview clicked');
    console.log('Comment data to preview:', { content, name, email, link });
    // You would typically render a preview of the comment here
  };

  return (
    // Use Bootstrap card and background/text utilities for the main container
    <div className="card bg-dark text-light my-4 p-4">
      {/* Back to post list link and comment count */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* Link needs to be updated with your actual routing */}
        <a href="#" className="text-secondary">Back to the post list</a>
        {/* Placeholder for comment count */}
        <span>{comments.length} comments have been posted.</span>
      </div>

      <h3 className="mb-3">Post your comment</h3>

      {/* Form for adding a new comment */}
      <form onSubmit={handleSubmit}>
        {/* Your comment textarea */}
        <div className="form-group mb-3">
          <label htmlFor="commentContent" className="form-label visually-hidden">Your comment</label>
          <textarea
            className="form-control bg-secondary border-0 text-light" // Styled textarea
            id="commentContent"
            rows="4"
            placeholder="Your comment" // Use placeholder instead of label for visual style
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </div>

        {/* Name input */}
        <div className="form-group mb-3">
          <label htmlFor="commentName" className="form-label">Name</label>
          <input
            type="text"
            className="form-control bg-secondary border-0 text-light" // Styled input
            id="commentName"
            value={name}
            onChange={e => setName(e.target.value)}
            // Add 'required' if name is mandatory
          />
        </div>

        {/* Mail input */}
        <div className="form-group mb-2"> {/* mb-2 for spacing before help text */}
          <label htmlFor="commentMail" className="form-label">Mail</label>
          <input
            type="email" // Use type="email" for better validation
            className="form-control bg-secondary border-0 text-light" // Styled input
            id="commentMail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            // Add 'required' if mail is mandatory
          />
          <small id="mailHelp" className="form-text text-muted">
            Required for comment verification
          </small>
        </div>

        {/* Link input */}
        <div className="form-group mb-3">
          <label htmlFor="commentLink" className="form-label">Link</label>
          <input
            type="url" // Use type="url" for better validation
            className="form-control bg-secondary border-0 text-light" // Styled input
            id="commentLink"
            placeholder="url your name links to" // Use placeholder
            value={link}
            onChange={e => setLink(e.target.value)}
          />
           <small id="linkHelp" className="form-text text-muted">
            (optional)
          </small>
        </div>

        {/* Notify checkbox */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input" // Bootstrap checkbox class
            id="notifyCheckbox"
            checked={notify}
            onChange={e => setNotify(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="notifyCheckbox">
            Notify me about follow-up comments
          </label>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-start"> {/* Use flexbox for button alignment */}
          <button type="submit" className="btn btn-primary me-2"> {/* Bootstrap primary button */}
            send
          </button>
          <button type="button" className="btn btn-secondary" onClick={handlePreview}> {/* Bootstrap secondary button */}
            preview
          </button>
        </div>
      </form>

      <hr className="my-4 border-secondary" /> {/* Styled horizontal rule */}

      {/* Display existing comments */}
      <h4 className="mb-3">Comments ({comments.length})</h4> {/* Heading for comments list */}
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <div className="comments-list"> {/* Container for comments list */}
          {comments.map(comment => (
            // Apply Bootstrap card or similar styling to each comment if desired
            <div key={comment.id} className="card bg-secondary text-light mb-3 p-3">
              {/* Assuming comment object has 'content' and 'created_at' */}
              <p className="card-text mb-1">{comment.content}</p>
              {/* Optional: Display name if available */}
              {comment.name && <p className="card-text mb-1"><small><strong>By:</strong> {comment.name}</small></p>}
              <p className="card-text"><small className="text-muted">Posted on: {new Date(comment.created_at).toLocaleString()}</small></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
