import React, { Component } from 'react';
import Router from '../../routes/Routes';
import { fetchContacts } from '../contact/contactActions';
import { connect } from 'react-redux';

class App extends Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.auth.isAuthenticated &&
      this.props.auth.isAuthenticated !== prevProps.auth.isAuthenticated
    ) {
      this.props.fetchContacts();
    }
  }
  render() {
    return <Router />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { fetchContacts }
)(App);
