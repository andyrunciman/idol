import React from 'react';
import Input from '../controls/Input';
import Container from '../layout/Container';
const ContactFilter = props => {
  return (
    <Container>
      <Input
        placeholder="Search"
        onChange={event => props.setFilter(event.target.value)}
        style={{ marginTop: '2rem' }}
      />
    </Container>
  );
};

export default ContactFilter;
