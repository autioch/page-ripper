import { combineReducers, createStore } from 'redux';
import { posts } from './reducers';

const ripperApp = combineReducers({
  posts
})

const store = createStore(ripperApp);

export { store };
