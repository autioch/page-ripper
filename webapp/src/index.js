import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './logger';

import App from './App';
import { fetchPostList } from './postList/actions';
import postListReducer from './postList/reducer';
import postDetailsReducer from './postDetails/reducer';
import imageListReducer from './imageList/reducer';
import './index.css';

const app = combineReducers({
  postDetails: postDetailsReducer,
  postList: postListReducer,
  imageList: imageListReducer
});

const store = createStore(app, applyMiddleware(thunkMiddleware, loggerMiddleware));

render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);

store.dispatch(fetchPostList());
