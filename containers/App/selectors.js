/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectSearchText = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('query')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectMovies = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('movies')
);

const makeSelectLibrary = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('library')
);


export {
  selectGlobal,
  makeSelectSearchText,
  makeSelectLoading,
  makeSelectError,
  makeSelectMovies,
  makeSelectLibrary
};
