import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../layout/Header';
import Button from '../controls/Button';
import Container from '../layout/Container';
import { deleteContact } from '../contact/contactActions';
import style from './ContactCard.module.css';
import moment from 'moment';

class ContactCard extends Component {
  handleEdit = () => {
    this.props.history.push(`/edit/${this.props.match.params.id}`);
  };
  handleDelete = () => {
    this.props.deleteContact(this.props.match.params.id, this.props.history);
  };
  handleBack = () => {
    this.props.history.push(`/dashboard`);
  };
  render() {
    return (
      <React.Fragment>
        <Header title="Contacts Dashboard">
          <Button content="Logout" link onClick={this.props.logout} />
        </Header>

        {!this.props.contact ? (
          <h1>Contact not found</h1>
        ) : (
          <React.Fragment>
            <Container>
              <div className={style.card}>
                <div className={style.main}>{this.props.contact.name}</div>
                <div className={style.secondary}>
                  <i className={['fas fa-at', style.icon].join(' ')} />
                  <div>{this.props.contact.email}</div>
                </div>
                {this.props.contact.phonenumber && (
                  <div className={style.secondary}>
                    <i
                      className={['fas fa-mobile-alt', style.icon].join(' ')}
                    />
                    <div>{this.props.contact.phonenumber}</div>
                  </div>
                )}
                {this.props.contact.address && (
                  <div className={style.secondary}>
                    <i className={['fas fa-envelope', style.icon].join(' ')} />
                    <div>
                      {this.props.contact.address} {this.props.contact.postcode}
                    </div>
                  </div>
                )}
                {this.props.contact.dob && (
                  <div className={style.secondary}>
                    <i
                      className={['fas fa-birthday-cake', style.icon].join(' ')}
                    />
                    <div>
                      {this.props.contact.dob &&
                        moment(this.props.contact.dob).format('Do MMMM YYYY')}
                    </div>
                  </div>
                )}
              </div>
            </Container>
            <Container>
              <div style={{ textAlign: 'center' }}>
                <Button onClick={this.handleEdit}>Edit</Button>
                <Button
                  onClick={this.handleBack}
                  style={{ marginLeft: '1rem' }}
                  content="Back"
                />
                <Button
                  onClick={this.handleDelete}
                  style={{ marginLeft: '1rem' }}
                  content="Delete"
                  warning
                />
              </div>
            </Container>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    contact: state.contacts.find(
      contact => contact._id === ownProps.match.params.id
    )
  };
};

export default connect(
  mapStateToProps,
  { deleteContact }
)(ContactCard);
