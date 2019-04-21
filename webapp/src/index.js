import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './logger';
import 'antd/dist/antd.css';

import App from './App';
import { fetchPostList } from './postList/actions';
import postListReducer from './postList/reducer';
import postDetailsReducer from './postDetails/reducer';
import imageListReducer from './imageList/reducer';

import { fetchImageList } from './imageList/actions';
import { fetchPostDetails } from './postDetails/actions';

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

let currentPostSelectedId = null;

/* TODO Make it work properly */
store.subscribe(() => {
  const stateSelectedId = store.getState().postList.selectedId;

  if (currentPostSelectedId === stateSelectedId) {
    return;
  }

  currentPostSelectedId = stateSelectedId;
  store.dispatch(fetchImageList(currentPostSelectedId));
  store.dispatch(fetchPostDetails(currentPostSelectedId));
});
