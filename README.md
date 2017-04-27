# Github User Search [![Build Status](https://app.codeship.com/projects/290694.svg?branch=master)](https://app.codeship.com/projects/290694)

Search and view users via the Github API - https://tomcanter.io/user-finder

Requests are cached in session storage to limit the use of the API.

## What is this?

A personal project built with React, Redux and other tools to search users and
view their profiles on Github. Nothing serious.

### Libraries and tools

* Aphrodite
* Babel
* Jest
* React
* React Router
* Redux
* Redux saga
* SUIT CSS
* Webpack
* lodash-fp
* normalizr

## Running locally

1. Clone the repository
1. Install dependences `yarn`
1. Run the server `yarnpkg run start`
1. Visit `http://localhost:3001/user-finder/` (note the trailing slash)

### API limit

The Github API has a fairly strict limit (hence the indicator of your remaining
requests in the footer). When running the app locally you can export a [personal
access token](https://github.com/blog/1509-personal-api-tokens) and this will be
sent along in any API calls to increase the limit:

```
export USER_FINDER_OAUTH=<your token>
yarnpkg run start
```
