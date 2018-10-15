import React from 'react';
import Container from '../layout/Container';
import Button from '../controls/Button';

export default function ContactControlPanel(props) {
  return (
    <Container>
      <Button
        style={{ marginTop: '2rem' }}
        content="Create Contact"
        onClick={props.createContact}
      />
    </Container>
  );
}
