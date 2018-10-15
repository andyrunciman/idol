import React, { Component } from 'react';
import ContactListItem from './ContactListItem';

export default class ContactList extends Component {
  render() {
    return (
      <div>
        {this.props.contacts.map(contact => (
          <ContactListItem contact={contact} />
        ))}
      </div>
    );
  }
}
