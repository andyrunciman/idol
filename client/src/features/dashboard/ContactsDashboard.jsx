import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../auth/authActions';
import { setFilter, clearFilter } from '../filter/filterActions';
import Header from '../layout/Header';
import Button from '../controls/Button';
import ContactList from '../contact/ContactList';
import ContactFilter from '../filter/ContactFilter';
import ContactControlPanel from '../contact/ContactControlPanel';

class ContactsDashboard extends Component {
  /**
   * Handles route to create contact
   */
  handleCreateContact = () => {
    this.props.history.push('/create');
  };

  /**
   * Filters the contacts ignoring case
   * It looks in any part of the name
   * @param {String} filter
   */
  filterContacts = () =>
    this.props.filter
      ? this.props.contacts.filter(contact =>
          contact.name.toLowerCase().includes(this.props.filter.toLowerCase())
        )
      : this.props.contacts;

  render() {
    return (
      <React.Fragment>
        <Header title="Contacts Dashboard">
          <Button content="Logout" link onClick={this.props.logout} />
        </Header>
        <ContactControlPanel createContact={this.handleCreateContact} />
        <ContactFilter setFilter={this.props.setFilter} />

        <ContactList contacts={this.filterContacts()} />
      </React.Fragment>
    );
  }
}

/**
 * Connects to the REDUS store and fetches the contacts. Contacts are also sorted at this point.
 * @param {Object} state
 */
const mapStateToProps = state => ({
  contacts: state.contacts.sort(
    (a, b) => a.names[a.names.length - 1] > b.names[b.names.length - 1]
  ),
  filter: state.filter
});

export default connect(
  mapStateToProps,
  { logout, setFilter, clearFilter }
)(ContactsDashboard);
