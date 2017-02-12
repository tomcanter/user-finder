import React from 'react';
import renderer from 'react-test-renderer';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import Pagination from './';

function createComponent(props) {
  return renderer.create(
    <Router>
      <Pagination {...props} />
    </Router>
  );
}

describe('Component: Pagination', () => {

  describe('when passed a next prop', () => {
    it('should render a next link', () => {
      const props = {
        next: {
          url: 'https://api.github.com/search/users?q=tom&page=2',
        },
      };
      const component = createComponent(props);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when passed a prev prop', () => {
    it('should render a previous link', () => {
      const props = {
        prev: {
          url: 'https://api.github.com/search/users?q=tom&page=1',
        },
      };
      const component = createComponent(props);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when passed a prev and next prop', () => {
    it('should render a previous and next link', () => {
      const props = {
        prev: {
          url: 'https://api.github.com/search/users?q=tom&page=1',
        },
        next: {
          url: 'https://api.github.com/search/users?q=tom&page=2',
        },
      };
      const component = createComponent(props);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

});
