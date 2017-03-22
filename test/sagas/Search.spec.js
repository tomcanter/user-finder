import {
  call,
  put,
} from 'redux-saga/effects';
import {isFSA} from 'flux-standard-action';
import api from 'store/api';
import {
  searchUsers,
} from 'store/sagas/Search';

describe('Saga: searchUsers', () => {

  describe('when a cached result exists', () => {
    it('should yield the result and return', () => {
      const generator = searchUsers({payload: {search: 'q=tom'}});
      generator.next();

      const successAction = generator.next({data: 'foo'}).value;
      expect(successAction).toEqual(
        put({
          payload: {
            data: 'foo',
            search: 'q=tom',
          },
          type: 'SEARCH_SUCCESS',
        })
      );
      expect(isFSA(successAction.PUT.action)).toBeTruthy();
    });
  });

  describe('when no cached data exists', () => {
    it('should call the API and normalize the data', () => {
      const generator = searchUsers({payload: {search: 'q=tom'}});
      generator.next();
      const apiCall = generator.next().value;
      expect(apiCall).toEqual(
        call(api.searchUsers, {q: 'tom'})
      );

      const response = {
        pagination: null,
        total_count: 2,
        items: [
          {id: 123, avatar_url: 'foo', login: 'alecrust', type: 'User'},
          {id: 456, avatar_url: 'foo', login: 'tomcanter', type: 'User'},
        ],
      };
      const successAction = generator.next(response).value;
      expect(successAction.PUT.action).toMatchSnapshot();
    });
  });

  describe('when a request to the API fails', () => {
    it('should call a failure action', () => {
      const generator = searchUsers({payload: {search: 'q=tom'}});
      const apiError = new Error('it went wrong');
      apiError.response = 'test';

      generator.next();
      generator.next();
      const errorAction = generator.throw(apiError).value;
      expect(errorAction.PUT.action).toMatchSnapshot();
    });
  });

});
