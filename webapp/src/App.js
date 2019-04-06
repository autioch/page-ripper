import React from 'react';
import ImageListView from './image/view';
import PostListView from './post/view';
import './App.css';

const App = () => (
  <div className="App">
    <PostListView/>
    <ImageListView/>
  </div>
);

export default App;
