import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Login from '../features/auth/login/Login';
import Register from '../features/auth/register/Register';
import ContactsDashboard from '../features/dashboard/ContactsDashboard';
import CreateContact from '../features/contact/CreateContact';
import EditContact from '../features/contact/EditContact';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/dashboard" component={ContactsDashboard} />
      <Route exact path="/create" component={CreateContact} />
      <Route exact path="/edit/:id" component={EditContact} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  </BrowserRouter>
);
