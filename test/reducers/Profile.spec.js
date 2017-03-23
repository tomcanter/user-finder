import profileReducer from 'reducers/Profile';

describe('Reducer: profile', () => {

  describe('when passed no state', () => {
    it('should return the initial state', () => {
      expect(
        profileReducer(undefined, {})
      ).toMatchSnapshot();
    });
  });

  describe('when a profile request is pending', () => {
    it('should set isPending to true', () => {
      const beforeState = {
        isPending: false,
      };
      const afterState = profileReducer(beforeState, {type: 'PROFILE_REQUEST'});

      expect(
        afterState
      ).toMatchSnapshot();
    });
  });

  describe('when a profile request is successful', () => {
    it('should update the state with the userProfile and cache it', () => {
      const beforeState = {
        isPending: true,
        userProfile: {},
      };
      const action = {
        payload: {
          login: 'tomcanter',
          name: 'Tom Canter',
        },
        type: 'PROFILE_SUCCESS',
      };
      const afterState = profileReducer(beforeState, action);

      expect(
        afterState
      ).toMatchSnapshot();
      expect(afterState).not.toBe(beforeState);
    });
  });

  describe('when a search request fails', () => {
    it('should update the state with the error message', () => {
      const beforeState = {
        error: null,
        isPending: true,
      };
      const action = {
        response: {},
        message: 'The server died',
        type: 'PROFILE_FAILURE',
      };
      const afterState = profileReducer(beforeState, action);

      expect(
        afterState
      ).toMatchSnapshot();
      expect(afterState).not.toBe(beforeState);
    });
  });

});
