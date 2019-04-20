import React from 'react';

import ImageListView from './imageList/view';
import ImageListToggleView from './imageList/toggle/view';

import PostListView from './postList/view';
import PostListToggleView from './postList/toggle/view';

import PostDetailsView from './postDetails/view';
import PostDetailsToggleView from './postDetails/toggle/view';

// import NextPostView from './postList/next/view';
// import PrevPostView from './postList/prev/view';

import './App.scss';

const App = () => (
  <div className="App">
    <PostListView/>
    <PostDetailsView/>
    <ImageListView/>
    <div className="toggle-list">
      <PostListToggleView/>
      <ImageListToggleView/>
      <PostDetailsToggleView/>
      {/* <NextPostView/> */}
      {/* <PrevPostView/> */}
    </div>
  </div>
);

export default App;
