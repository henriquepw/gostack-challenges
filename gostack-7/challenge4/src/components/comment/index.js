import React from 'react';

import './comment.css';

const Comment = ({ data }) => {
  const { author, content } = data;
  return (
    <div className="comment-container">
      <img className="comment-icon " src={author.avatar}/>
      <p className="comment-content">
        <strong>{author.name}</strong>{` ${content}`}
      </p>
    </div>
  );
};

export default Comment;