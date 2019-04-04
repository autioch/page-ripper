import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {store} from './store';
import { selectPost, setPostList } from './store/actions';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Log the initial state
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => console.log(store.getState()))

// Dispatch some actions
store.dispatch(setPostList([{id: 'a'},{id: 'b'}]))
store.dispatch(selectPost('a'))

// Stop listening to state updates
unsubscribe()

/* TODO NEXT STEP */
// https://redux.js.org/basics/usage-with-react
