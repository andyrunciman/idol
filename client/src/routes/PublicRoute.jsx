import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import React from 'react';

const PublicRoute = ({ component: Component, auth, ...rest }) => {
  return !auth.isAuthenticated ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to="/dashboard" />
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(PublicRoute);
