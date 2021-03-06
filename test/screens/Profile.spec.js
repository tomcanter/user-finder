import React from 'react';
import {shallow} from 'enzyme';

import ProfileScreen from 'screens/Profile';
import DocumentTitle from 'react-document-title';
import ProfileContainer from 'containers/Profile';

describe('Screen: ProfileScreen', () => {
  it('should create a document title', () => {
    const props = {
      match: {
        params: {username: 'tomcanter'},
      },
    };
    const wrapper = shallow(<ProfileScreen {...props} />);
    expect(wrapper.find(DocumentTitle).props().title).toEqual('tomcanter\'s profile - Github user finder');
  });

  it('should pass match props to ProfileContainer', () => {
    const props = {
      match: {
        params: {username: 'tomcanter'},
      },
    };
    const wrapper = shallow(<ProfileScreen {...props} />);
    expect(wrapper.find(ProfileContainer).props()).toEqual(props);
  });
});
