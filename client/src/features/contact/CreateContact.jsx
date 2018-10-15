import React, { Component } from 'react';
import Header from '../layout/Header';
import Button from '../controls/Button';
import Container from '../layout/Container';
import ContactForm from '../contact/ContactForm';

export default class CreateContact extends Component {
  render() {
    return (
      <React.Fragment>
        <Header title="Contacts Dashboard" />
        <Container>
          <ContactForm />
        </Container>
      </React.Fragment>
    );
  }
}
