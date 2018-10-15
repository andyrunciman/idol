import React from 'react';
import Input from '../controls/Input';

const ContactFilter = props => {
  return (
    <div>
      <h1>Filter</h1>
      <Input
        placeholder="Search"
        onChange={event => props.setFilter(event.target.value)}
      />
    </div>
  );
};

export default ContactFilter;
