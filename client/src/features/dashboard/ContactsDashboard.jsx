import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../auth/authActions';
import { fetchContacts } from '../contact/contactActions';
import { setFilter, clearFilter } from '../filter/filterActions';
import Header from '../layout/Header';
import Button from '../controls/Button';
import ContactList from '../contact/ContactList';
import ContactFilter from '../filter/ContactFilter';

class ContactsDashboard extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }
  /**
   * Filters the contacts
   * @param {String} filter
   */
  filterContacts = () => {
    if (this.props.contacts && this.props.filter) {
      return this.props.contacts.filter(contact =>
        contact.name.includes(this.props.filter)
      );
    }
    return this.props.contacts;
  };
  render() {
    return (
      <React.Fragment>
        <Header title="Contacts Dashboard">
          <Button content="Logout" link onClick={this.props.logout} />
        </Header>
        <ContactFilter setFilter={this.props.setFilter} />
        <ContactList contacts={this.filterContacts()} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts,
  filter: state.filter
});

export default connect(
  mapStateToProps,
  { logout, fetchContacts, setFilter, clearFilter }
)(ContactsDashboard);
