/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { SEARCH_REQUEST } from './constants';
import { searchSuccess, searchError } from './actions';
import { makeSelectSearchText } from './selectors';

/**
 * movies request/response handler
 */

export function* doSearch() {
  // Select username from store
  const searchText = yield select(makeSelectSearchText());
  if(searchText){
    const requestURL = `?s=${searchText}`;;
    try {
      // Call our request helper (see 'utils/request')
      
      //*Move this to actions
      const res = yield call(request, requestURL),
            movies = res.Search;
      yield put(searchSuccess(movies));
    } catch (err) {
      yield put(searchError(err));
    }
  }else{
    yield put(searchError([]));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* Search() {
  // Watches for SEARCH_REQUEST actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount.
  yield takeLatest(SEARCH_REQUEST, doSearch);
}