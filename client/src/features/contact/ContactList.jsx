import React, { Component } from 'react';
import ContactListItem from './ContactListItem';
import Container from '../layout/Container';

export default class ContactList extends Component {
  render() {
    return (
      <Container>
        {this.props.contacts.map(contact => (
          <ContactListItem key={contact._id} contact={contact} />
        ))}
      </Container>
    );
  }
}
