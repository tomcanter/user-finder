// @flow

import pick from 'lodash/fp/pick';
import mergeAll from 'lodash/fp/mergeAll';
import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
} from './actions';

const initialState = {
  error: null,
  isPending: false,
  query: '',
  result: [],
};

export default function searchReducer(state: Object = initialState, action: Object) {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        isPending: true,
      };
    case SEARCH_SUCCESS:
      return mergeAll([
        state,
        pick(['result', 'query'], action),
        {isPending: false},
      ]);
    case SEARCH_FAILURE: {
      const {response, message} = action;
      return {
        ...state,
        isPending: false,
        error: {
          response,
          message,
        },
      };
    }
    default:
      return state;
  }
}
