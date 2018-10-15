import React, { Component } from 'react';
import Header from '../layout/Header';
import Button from '../controls/Button';
import Container from '../layout/Container';
import ContactForm from '../contact/ContactForm';

export default class EditContact extends Component {
  render() {
    return (
      <React.Fragment>
        <Header title="Contacts Dashboard">
          <Button content="Logout" link onClick={this.props.logout} />
        </Header>
        <Container>
          <ContactForm id={this.props.match.params.id} />
        </Container>
      </React.Fragment>
    );
  }
}
