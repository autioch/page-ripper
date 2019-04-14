import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './logger';
import { fetchPosts } from './post/actions';

import App from './App';
import postReducer from './post/reducer';
import imageReducer from './image/reducer';
import './index.css';

const app = combineReducers({
  posts: postReducer,
  images: imageReducer
});

const store = createStore(app, applyMiddleware(thunkMiddleware, loggerMiddleware));

render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);

store.dispatch(fetchPosts());
