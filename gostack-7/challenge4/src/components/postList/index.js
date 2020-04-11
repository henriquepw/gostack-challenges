import React, { Component } from 'react';

import Post from '../post';

import './postList.css';

const c = {
  author: {
    name: 'Diego Fernandes',
    avatar: require('../../assets/profile.png'),
  },
  content: "Conteúdo do comentário"
};

const p = {
  author: {
    name: 'Diego Fernandes',
    avatar: require('../../assets/profile.png'),
  },
  date: '04 Jun 2019',
  content: 'Pessoal, alguém sabe se a Rocketseat está contratando?',
  comments: [ {id: 1, ...c}, {id: 2, ...c} ],
}

class PostList extends Component {
  state = {
    posts: [
      { id: 1, ...p },
      { id: 2, ...p },
      { id: 3, ...p }
    ]
  };

  render() {
    const { posts } = this.state;
    return (
      <div className="postList-container">
        {posts.map(post => <Post key={post.id} data={post} />)}
      </div>
    );
  };
}

export default PostList;
