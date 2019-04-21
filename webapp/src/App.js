import React from 'react';

import ImageListView from './imageList/view';
import ImageListToggleView from './imageList/toggle/view';

import PostListView from './postList/view';
import PostListToggleView from './postList/navigation/toggle/view';
import NextPostView from './postList/navigation/next/view';
import PrevPostView from './postList/navigation/prev/view';

import PostDetailsView from './postDetails/view';
import PostDetailsToggleView from './postDetails/toggle/view';

import './App.scss';

const App = () => (
  <div className="App">
    <PostListView/>
    <PostDetailsView/>
    <ImageListView/>
    <div className="toggle-list">
      <NextPostView/>
      <PrevPostView/>
      <PostListToggleView/>
      <PostDetailsToggleView/>
      <ImageListToggleView/>
    </div>
  </div>
);

export default App;
