import React from "react";

import Comment from "../comment";

import "./post.css";

const Post = ({ data }) => {
  return (
    <section className="post-container">
      <div className="post">
        <div className="author">
          <img className="post-logo" src={data.author.avatar}/>
          <div>
            <strong>{data.author.name}</strong>
            <p className="post-date" >{data.date}</p>
          </div>
        </div>
        <p>{data.content}</p>
      </div>
      <div className="divider" />
      <div>
        {data.comments.map(comment => (
          <Comment key={comment.id} data={comment} />
        ))}
      </div>
    </section>
  );
};

export default Post;
