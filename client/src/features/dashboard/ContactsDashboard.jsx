import React, { Component } from 'react';
import ContactList from '../contact/ContactList';
import ContactCards from '../contact/ContactCards';
import { connect } from 'react-redux';
import { fetchContacts } from '../contact/contactActions';

class ContactsDashboard extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    console.log(this.props.contacts);
    return (
      <div>
        <ContactList />
        <ContactCards />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts,
  async: state.async
});

export default connect(
  mapStateToProps,
  { fetchContacts }
)(ContactsDashboard);
