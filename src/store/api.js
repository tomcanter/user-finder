// @flow

import axios from 'axios';
import assignAll from 'lodash/fp/assignAll';
import parseLinkHeader from 'parse-link-header';

export const PER_PAGE = 35;

const github = axios.create({
  baseURL: 'https://api.github.com/',
});

const token = process.env.USER_FINDER_OAUTH;
if (token) {
  github.defaults.headers.common.Authorization = `token ${token}`;
}

function addPagination(response: Object): Object {
  const {data, headers} = response;
  const pagination = parseLinkHeader(headers.link);
  return assignAll([
    data,
    {pagination},
  ]);
}

function searchUsers(params: Object): Promise<*> {
  const defaultParams = {
    per_page: PER_PAGE,
  };
  return github
    .get('/search/users', {
      params: assignAll([defaultParams, params]),
    })
    .then(addPagination);
}

export default {
  searchUsers,
};
