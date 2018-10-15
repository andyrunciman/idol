import React from 'react';
import { register } from '../authActions';
import { connect } from 'react-redux';
import Input from '../../controls/Input';
import Button from '../../controls/Button';
import styles from './Register.module.css';

/**
 * Login class which handles the rendering of the login screen
 */
class Register extends React.Component {
  state = {
    email: '',
    password: '',
    errors: ''
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  handleLogin = event => {
    event.preventDefault();
    this.props.register({
      email: this.state.email,
      password: this.state.password
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className={styles.layout}>
        <div className={styles.box}>
          <h1 className={styles.title}>Registration</h1>
          <p className={styles.subtitle}>Manage your contacts with style!</p>

          <form className={styles.form} onSubmit={this.handleLogin}>
            <Input
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
              placeholder="Email"
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
            />

            <Button type="submit" content="Register" />
            {this.props.async.error && (
              <p className={styles.error}>
                Your email and/or password do not match those on our system
              </p>
            )}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  async: state.async,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { register }
)(Register);
