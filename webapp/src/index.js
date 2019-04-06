import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { render } from 'react-dom';

import App from './App';
import postsReducer from './post/reducers';
import './index.css';

const app = combineReducers({
  posts: postsReducer
});

const store = createStore(app);

render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);
