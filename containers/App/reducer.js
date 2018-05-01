import { fromJS,List } from 'immutable';

import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  ADD_TO_LIB
} from './constants';

let library = [];
if (localStorage.getItem('library')) {
  library = JSON.parse(localStorage.getItem('library'));
}
const initialState = fromJS({ movies : false, library : List(library), loading : false });

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case SEARCH_REQUEST:
    let error = false;
      return state
        .set('loading', true)
        .set('query', action.query)
        .set('error', error);
    case SEARCH_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('movies', action.movies);
    
    case SEARCH_ERROR:
      return state
        .set('error', true)
        .set('loading', false)
        .set('movies', []);
      case ADD_TO_LIB:
        var library = state.get('library');
        library = library.concat(action.library);
        addToStorage(library);
        return state
          .set('library', library);
    default:
      return state
  }
}

const addToStorage = (movies) => localStorage.setItem('library', JSON.stringify(movies))