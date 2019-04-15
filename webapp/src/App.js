import React from 'react';
import ImageListView from './imageList/view';
import PostListView from './postList/view';
import PostDetailsView from './postDetails/view';

import './App.css';

const App = () => (
  <div className="App">
    <PostListView/>
    <PostDetailsView/>
    <ImageListView/>
  </div>
);

export default App;
