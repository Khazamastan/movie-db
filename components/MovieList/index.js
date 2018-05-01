import React from 'react';
import MovieCard from "../MovieCard";
import Pagination from "../Pagination";
import LoadingIndicator from 'components/LoadingIndicator';
import _ from "lodash";

const renderUserList = (props) => {
  let {loading, PER_PAGE, currentPage, paginate, addToLibrary, library, viewType} = props;
  var { list } = props;
  if (loading) {
    return <LoadingIndicator color='#111' top='10' key="LoadingIndicator" />;
  }

  const clickAddLibrary = (data) => {
    addToLibrary(data)
  }
  const libByKey = _.keyBy((library && library.toArray() || []), 'imdbID');
  if (list) {
    // list = paginate(list, PER_PAGE, currentPage);

    return (
      <ul>
        {
          list.map((value, i) => {
            const inLib = libByKey[value.imdbID]
            return (<MovieCard
              viewType={viewType}
              inLib={inLib}
              key={i + value.imdbID}
              addToLibrary={clickAddLibrary.bind(this, value)}
              {...value}
            />);
          })
        }
      </ul>
    );
  }
};

const MovieList = (props) => {
  const { query, totalCount, PER_PAGE, loading, onChangePage, currentPage} = props;
  const userListContent = (
    <div>
      <div className='skelecon-screen'>
        {renderUserList(props)}
      </div>
    </div>
  );


  return (
    <div>
      {userListContent}
      {(totalCount && (totalCount > PER_PAGE) && !loading) ?
        <Pagination
          onChangePage={onChangePage}
          count={totalCount}
          currentPage={currentPage + 1}
        />
        :
        null
      }
    </div>
  )
}

export default MovieList;