import { POST_DETAILS_SET, POST_DETAILS_LOADING, POST_DETAILS_TOGGLE } from './actionTypes';

const initialState = {
  details: undefined, // eslint-disable-line no-undefined
  isLoading: false,
  isExpanded: true
};

export default function postDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case POST_DETAILS_SET:
      return {
        ...state,
        details: action.details
      };
    case POST_DETAILS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case POST_DETAILS_TOGGLE:
      return {
        ...state,
        isExpanded: action.isExpanded === undefined ? !state.isExpanded : action.isExpanded
      };
    default:
      return state;
  }
}
