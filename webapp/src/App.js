import React from 'react';

import ImageListView from './imageList/view';
import ImageListToggleView from './imageList/navigation/toggle';

import PostListView from './postList/view';
import PostListToggleView from './postList/navigation/toggle';
import NextPostView from './postList/navigation/next';
import PrevPostView from './postList/navigation/prev';

import PostDetailsView from './postDetails/view';
import PostDetailsToggleView from './postDetails/navigation/toggle';
import PostDetailsInfoView from './postDetails/info';
import MenuView from './menu/view';

import './App.scss';

const App = () => (
  <div className="App">
    <PostListView/>
    <PostDetailsView/>
    <ImageListView/>
    <MenuView>
      <PrevPostView/>
      <NextPostView/>
      <PostListToggleView/>
      <PostDetailsToggleView/>
      <ImageListToggleView/>
    </MenuView>
    <PostDetailsInfoView/>
  </div>
);

export default App;
