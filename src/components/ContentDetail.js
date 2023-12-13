// ContentDetail.js
import React, { useState } from 'react';

const ContentDetail = ({ content }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Add the new comment to the comments state
    setComments((prevComments) => [...prevComments, comment]);
    // Clear the comment input
    setComment('');
  };

  return (
    <div>
      <h1>{content.isim}</h1>
      <img src={content.img} alt="" className="img-fluid" />
      <p>{content.desc}</p>

      <h2>Comments</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>

      <form onSubmit={handleCommentSubmit}>
        <label htmlFor="comment">Add a comment:</label>
        <input
          type="text"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContentDetail;
