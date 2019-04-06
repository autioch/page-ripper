import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { fetchPosts } from './post/actions';

import App from './App';
import postsReducer from './post/reducer';
import './index.css';

const app = combineReducers({
  posts: postsReducer
});

const store = createStore(app, applyMiddleware(thunkMiddleware));

render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);

store.dispatch(fetchPosts());
