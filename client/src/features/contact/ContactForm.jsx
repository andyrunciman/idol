import React from 'react';
import Input from '../controls/Input';
import Button from '../controls/Button';
import { connect } from 'react-redux';
import { createContact, updateContact } from '../contact/contactActions';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { isEmpty } from '../../utils/isEmpty';

class ContactForm extends React.Component {
  state = {
    id: null,
    email: '',
    name: '',
    phonenumber: '',
    address: '',
    postcode: '',
    dob: ''
  };
  static getDerivedStateFromProps(props, state) {
    if (props.contact && props.contact._id !== state._id) {
      console.log(props.contact);
      return {
        ...props.contact,
        dob: !isEmpty(props.contact.dob)
          ? moment(props.contact.dob).format('DD/MM/YYYY')
          : ''
      };
    } else {
      return null;
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  clientSideValidation = () => {
    const errors = {};
    const contact = {};
    //validate email
    if (!this.state.email) {
      errors['email'] = 'Email is required';
    } else {
      contact['email'] = this.state.email;
    }
    //validate name
    if (isEmpty(this.state.name)) {
      errors['name'] = 'Name is required';
    } else {
      contact['name'] = this.state.name;
    }
    //check phone number
    if (!isEmpty(this.state.phonenumber)) {
      if (
        this.state.phonenumber.length < 5 ||
        this.state.phonenumber.length > 13
      ) {
        errors['phonenumber'] =
          'Your phone number needs to be between 5 and 13 digits long';
      } else if (!/^[0-9]*$/.test(this.state.phonenumber)) {
        errors['phonenumber'] =
          'Your phone number can only contain numbers e.g no spaces or special characters';
      } else {
        contact['phonenumber'] = this.state.phonenumber;
      }
    }
    //check address
    if (!isEmpty(this.state.address)) {
      contact['address'] = this.state.address;
    }
    //check postcode
    if (!isEmpty(this.state.postcode)) {
      if (this.state.postcode.length < 5 || this.state.postcode.length > 7) {
        errors['postcode'] =
          'Your postcode needs to be between 5 and 7 letters long';
      } else {
        contact['postcode'] = this.state.postcode;
      }
    }
    //check dateofbirth
    if (!isEmpty(this.state.dob)) {
      if (!moment(this.state.dob, 'DD/MM/YYYY', true).isValid()) {
        errors['dob'] = 'Please enter a date of birth in the format DD/MM/YYYY';
      } else {
        contact['dob'] = moment(this.state.dob, 'DD-MM-YYYY').toDate();
      }
    }
    return { errors, contact };
  };

  onSubmit = e => {
    e.preventDefault();
    const { errors, contact } = this.clientSideValidation();

    if (Object.keys(errors).length === 0) {
      this.setState({ errors: null });
      //if we have a contact - call update else create a new one
      if (this.props.contact) {
        this.props.updateContact(
          this.props.match.params.id,
          contact,
          this.props.history
        );
      } else {
        this.props.createContact(contact, this.props.history);
      }
    } else {
      this.setState({ errors });
    }
  };
  render() {
    //get either the client side or server side messages
    let errors = this.state.errors || this.props.async.error;

    return (
      <form
        style={{ marginTop: '2rem' }}
        className="form"
        onSubmit={this.onSubmit}
      >
        <Input
          type="text"
          name="email"
          placeholder="Email"
          autoFocus
          value={this.state.email}
          onChange={this.handleChange}
          error={errors && errors['email']}
        />

        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleChange}
          error={errors && errors['name']}
        />

        <Input
          type="text"
          name="phonenumber"
          placeholder="Phone"
          value={this.state.phonenumber}
          onChange={this.handleChange}
          error={errors && errors['phonenumber']}
        />

        <Input
          type="text"
          name="address"
          placeholder="Address Line 1"
          value={this.state.address}
          onChange={this.handleChange}
          error={errors && errors['address']}
        />

        <Input
          type="text"
          name="postcode"
          placeholder="Post Code"
          value={this.state.postcode}
          onChange={this.handleChange}
          error={errors && errors['postcode']}
        />

        <Input
          type="text"
          name="dob"
          placeholder="Date of Birth"
          value={this.state.dob}
          onChange={this.handleChange}
          error={errors && errors['dob']}
        />

        <div style={{ textAlign: 'center' }}>
          <Button
            content={this.props.contact ? 'Save Changes' : 'Create Contact'}
          />
        </div>
      </form>
    );
  }
}
const mapStateToProps = (state, props) => ({
  async: state.async,
  contact: state.contacts.find(contact => props.id === contact._id)
});

export default connect(
  mapStateToProps,
  { createContact, updateContact }
)(withRouter(ContactForm));
