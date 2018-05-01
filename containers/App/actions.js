/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  ADD_TO_LIB
} from './constants';



/**
 * Load the movies, this action starts the request saga
 *
 * @return {object} An action object with a type of SEARCH_REQUEST
 */

 export function searchRequest(query, loggedInUser) {
  return {
    type: SEARCH_REQUEST,
    query,
    loggedInUser,
  };
}

/**
 * Dispatched when the movies are loaded by the request saga
 *
 * @param  {array}  movies data.
 * 
 * @return {object} An action object with a type of SEARCH_SUCCESS passing the movies
 */
export function searchSuccess(movies) {
  return {
    type: SEARCH_SUCCESS,
    movies,
  };
}

/**
 * Dispatched when loading the movies fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of SEARCH_ERROR passing the error
 */
export function searchError(error) {
  return {
    type: SEARCH_ERROR,
    error,
  };
}


export function addToLibrary(library) {
  return {
    type: ADD_TO_LIB,
    library,
  };
}

