import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import api from 'store/api';
import {normalize} from 'normalizr';
import assignAll from 'lodash/fp/assignAll';
import qs from 'query-string';
import {userSchema} from 'store/schema';
import {getSearchFromCache} from 'store/reducers/Cache';

function normalizeResponse(response: Object) {
  const normalized = normalize(response.items, userSchema);
  const {total_count, pagination} = response;
  return assignAll([
    normalized,
    {
      totalResults: total_count,
      pagination,
    },
  ]);
}

function searchSuccessAction(response: Object, search: string) {
  return put({
    payload: assignAll([response, {search}]),
    type: 'SEARCH_SUCCESS',
  });
}

export function* searchUsers(action) {
  const {payload: {search}} = action;
  const cachedSearch = yield select(getSearchFromCache(search));
  if (cachedSearch) {
    yield searchSuccessAction(cachedSearch, search);
    return;
  }

  try {
    const response = yield call(api.searchUsers, qs.parse(search));
    const normalizedResponse = normalizeResponse(response);
    yield searchSuccessAction(normalizedResponse, search);
  } catch (err) {
    yield put({
      error: true,
      payload: err,
      type: 'SEARCH_FAILURE',
    });
  }
}

export function* watchSearchUsers() {
  yield takeLatest('SEARCH_REQUEST', searchUsers);
}
