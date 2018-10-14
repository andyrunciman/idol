import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react';

const Register = () => (
  <div className="registration-form">
    <Grid
      textAlign="center"
      style={{ height: '100%', marginTop: '3rem' }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Contact Manager - Registration
        </Header>
        <Form size="large">
          <Segment>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button color="teal" fluid size="large">
              Register
            </Button>
          </Segment>
        </Form>

        <Message>
          Already Registered? <Link to="/login">Log in</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
);

export default Register;
