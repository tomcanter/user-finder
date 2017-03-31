// @flow

import React from 'react';
import qs from 'query-string';
import {Route} from 'react-router-dom';
import curry from 'lodash/fp/curry';
import {
  css,
  StyleSheet,
} from 'aphrodite/no-important';
import HeaderContainer from 'containers/Header';
import Container from 'components/Container';
import {PER_PAGE} from 'store/api';
import 'suitcss-utils-flex/lib/flex.css';

type Props = {
  component: Function,
};

export const pushUrlQuery = curry((push: Function, query: string) => {
  push({
    pathname: '/search',
    search: `per_page=${PER_PAGE}&page=1&q=${query}`,
  });
});

const renderRoute = curry((Component, matchProps) => {
  const {location, history: {push}} = matchProps;
  const parsedSearch = qs.parse(location.search);
  const searchTerm = parsedSearch.q;

  return (
    <div className={`${css(styles.DefaultLayout)} u-flex u-flexCol`}>
      <HeaderContainer
        searchTerm={searchTerm}
        searchQuery={qs.stringify(parsedSearch)}
        onSubmit={pushUrlQuery(push)}
      />
      <div className="u-flexGrow1">
        <Component {...matchProps} />
      </div>
      <Container rootStyle={styles.DefaultLayout_footer}>
        <p className={css(styles.DefaultLayout_footerText)}>
          View the <a href="https://github.com/tomcanter/user-finder">source on GitHub</a>
        </p>
      </Container>
    </div>
  );
});

function DefaultLayout({
  component: Component,
  ...restProps
}: Props) {
  return (
    <Route
      {...restProps}
      render={renderRoute(Component)}
    />
  );
}

const styles = StyleSheet.create({
  DefaultLayout: {
    minHeight: '100vh',
  },

  DefaultLayout_footer: {
    borderTop: '1px solid #ccc',
    marginTop: 30,
  },

  DefaultLayout_footerText: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
  },
});

export default DefaultLayout;
