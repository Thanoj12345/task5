import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  // Load posts from local storage on initial app load
  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  // Update local storage whenever posts change
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleInputChange = (event) => {
    setNewPost(event.target.value);
  };

  const handleCreatePost = () => {
    if (newPost.trim() !== '') {
      const newPosts = [...posts, newPost];
      setPosts(newPosts);
      setNewPost('');
    }
  };

  const handleDeletePost = (index) => {
    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  return (
    <div className="app">
      <h1>React Blog</h1>
      <div className="create-post">
        <input
          type="text"
          value={newPost}
          onChange={handleInputChange}
          placeholder="Enter your post"
        />
        <button onClick={handleCreatePost}>Create Post</button>
      </div>
      <div className="posts">
        {posts.map((post, index) => (
          <div className="post" key={index}>
            <p>{post}</p>
            <button onClick={() => handleDeletePost(index)}>Delete Post</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
