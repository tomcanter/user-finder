import React from 'react';
import renderer from 'react-test-renderer';
import {StyleSheetTestUtils} from 'aphrodite';
import ProfileTitle from 'components/ProfileTitle';

describe('Component: ProfileTitle', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render', () => {
    const component = renderer.create(<ProfileTitle
      name="Tom"
      username="tomcanter"
      userLink="http://tomcanter.io"
    />);
    expect(component).toMatchSnapshot();
  });

});
