/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

 // Import all the third party stuff
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, Redirect, withRouter  } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { push } from 'react-router-redux';
import reducer from '../App/reducer';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import saga from "./saga";

//components
// Import route containers
import Library from 'containers/Library/Loadable';
import SearchPage from 'containers/SearchPage/Loadable';
import NavBar from "components/NavBar";

const AppWrapper = styled.div`
  margin: 0 auto;
  height: 100%;
  background :transparent url(${ props => props.bg}) center/cover;
  transition : background 0.3s ease-in;
`;

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  static contextTypes = {
    router: PropTypes.object
  }
  render(){
    return (
      <AppWrapper>
      <Helmet
        titleTemplate="%s - The Audio DB"
        defaultTitle="The Audio DB"
      >
      <meta name="description" content="A The Audio DB application" />
      </Helmet>
      <NavBar/>
      <Switch>
          <Route path="/library" component={Library} />
          <Route path="/" component={SearchPage} /> 
      </Switch>
      </AppWrapper>
    );
  }
}

App.contextTypes = {  
  store:  PropTypes.object,
  router : PropTypes.object 
};


export function mapDispatchToProps(dispatch) {
  return {
    dispatch : dispatch,
  }
}

const mapStateToProps = createStructuredSelector({
});


const withReducer = injectReducer({ key: 'global', reducer });

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'search', saga });

export default withRouter(compose(
  withReducer,
  withSaga,
  withConnect
)(App));
