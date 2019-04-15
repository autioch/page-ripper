import { POST_DETAILS_SET, POST_DETAILS_LOADING } from './actionTypes';

const initialState = {
  details: undefined, // eslint-disable-line no-undefined
  isLoading: false
};

export default function postDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case POST_DETAILS_SET:
      return {
        details: action.details
      };
    case POST_DETAILS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
}
