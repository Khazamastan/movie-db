import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { 
  makeSelectSearchText,
  makeSelectLoading,
  makeSelectError,
  makeSelectLibrary,
  makeSelectMovies
} from 'containers/App/selectors';

import LoadingIndicator from 'components/LoadingIndicator';
import Pagination from "components/Pagination";
import MovieCard from "components/MovieCard";
import MovieList from "components/MovieList";

class ArtistPage extends React.Component {
  constructor(props){
    super(props);
    const { query } = this.props;
  }
  PER_PAGE = 10;
  state = { query : "", currentPage : 0 };
  paginate (array, page_size, page_number) {
    return array || array.slice(page_number * page_size, (page_number + 1) * page_size);
  }
  onChangePage(page){
    this.setState({currentPage : page-1})
  }
  render() {
    let { loading, error, library } = this.props, userListContent;
    const {currentPage, query} = this.state;
    var totalCount = library && library.length || 0;    
    if(library)
        library = library.toArray()
    return (
      <div className="search-page">
        <div className="form search">
          <h1>Library</h1>
          {(library && library.length) ? 
            <MovieList
              loading={loading}
              list={library}
              viewType={'view'}
              currentPage={currentPage}
              onChangePage={this.onChangePage}
              PER_PAGE={this.PER_PAGE}
              totalCount={totalCount}
              paginate={this.paginate}
              query={query}
            />
          :
          <p>No Items in Library</p>
        }
        </div>
      </div>);
  }

}


export function mapDispatchToProps(dispatch) {
  return {
    dispatch : dispatch
  };
}

const mapStateToProps = createStructuredSelector({
  library: makeSelectLibrary(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
  withConnect,
)(ArtistPage);
