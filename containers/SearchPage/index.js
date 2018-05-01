import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import debounce from "lodash/debounce";
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { 
  makeSelectSearchText,
  makeSelectLoading,
  makeSelectError,
  makeSelectLibrary,
  makeSelectMovies
} from 'containers/App/selectors';

import { searchRequest, addToLibrary } from "containers/App/actions"
import MovieList from "components/MovieList";

class SearchPage extends React.Component {
  constructor(props){
    super(props);
    const { query } = this.props;
    this.onChangeQuery = this.onChangeQuery.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  PER_PAGE = 30;
  state = { query : "" , currentPage : 0};
  onChangeQuery = function(e){
    const query = e.target.value;
    this.setState({ query });
  }
  onSubmit(e){
    e.preventDefault();
    this.debounceSearch(this.state.query);
  }
  paginate (array, page_size, page_number) {
    return array || array.slice(page_number * page_size, (page_number + 1) * page_size);
  }
  onChangePage= (page) => {
    this.setState({currentPage : page-1})
  }
 
  debounceSearch = debounce(function(query) {
    const { loggedInUser } = this.props;
    this.props.searchRequest(query, loggedInUser);
  }.bind(this), 300);
  componentWillReceiveProps(nextProps){
    if(nextProps.query){
      this.setState({query : nextProps.query})
    }
  }
  
  render() {
    let { loading, error, movies, addToLibrary, library} = this.props, userListContent;
    const {currentPage, query} = this.state;
    var totalCount = movies && movies.length || 0;

    return (
      <div className="search-page">
        <div className="form search">
          <form className="search-form"  onSubmit={this.onSubmit} > 
            <input 
              type="text"
              value={query || ""}
              placeholder="Search By Movie Name"
              onChange={this.onChangeQuery} 
              className="left-corner"
            />
            <button type="button"className="right-corner">Search</button>
          </form>
          {(movies && !movies.length) ? <p>No items for this Search</p> : null}
            <MovieList
              loading={loading}
              list={movies}
              viewType="movie" 
              currentPage={currentPage}
              onChangePage={this.onChangePage}
              PER_PAGE={this.PER_PAGE}
              totalCount={totalCount}
              paginate={this.paginate}
              library = {library}
              addToLibrary = {addToLibrary}
              query={query}
            />
        </div>
      </div>);
  }

}



SearchPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  searchRequest: PropTypes.func,
  query: PropTypes.string,
  users: PropTypes.any,
};


export function mapDispatchToProps(dispatch) {
  return {
    searchRequest: (query, loggedInUser) => {
      dispatch(searchRequest(query, loggedInUser))
    },
    addToLibrary : (data) => {
      dispatch(addToLibrary(data));
    }
  };
}

const mapStateToProps = createStructuredSelector({
  query: makeSelectSearchText(),
  library: makeSelectLibrary(),
  movies: makeSelectMovies(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(SearchPage);
