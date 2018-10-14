import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../authActions';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react';

/**
 * Login class which handles the rendering of the login screen
 */
class Login extends React.Component {
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

  handleLogin = () => {
    this.props.login({
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
      <div className="login-form">
        <Grid
          textAlign="center"
          style={{ height: '100%', marginTop: '3rem' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Contact Manager
            </Header>
            <Form
              size="large"
              loading={this.props.async.loading}
              error={!!this.props.async.error}
            >
              <Segment>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                  value={this.state.email}
                  name="email"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                  name="password"
                />

                <Button
                  color="teal"
                  fluid
                  size="large"
                  onClick={this.handleLogin}
                >
                  Login
                </Button>
              </Segment>
              <Message
                error
                header="Login Failed"
                content="The email or password that you have provided do not match those for your account "
              />
            </Form>

            <Message>
              Not registered yet? <Link to="/register">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
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
  { login }
)(Login);
