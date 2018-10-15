import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Login from '../features/auth/login/Login';
import Register from '../features/auth/register/Register';
import ContactsDashboard from '../features/dashboard/ContactsDashboard';
import CreateContact from '../features/contact/CreateContact';
import EditContact from '../features/contact/EditContact';
import PrivateRoute from '../routes/PrivateRoute';
import PublicRoute from '../routes/PublicRoute';
import ContactCard from '../features/contact/ContactCard';
import NoMatch from './NoMatch';

export default () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute exact path="/" component={Login} />
      <PrivateRoute exact path="/dashboard" component={ContactsDashboard} />
      <PrivateRoute exact path="/create" component={CreateContact} />
      <PrivateRoute exact path="/edit/:id" component={EditContact} />
      <PrivateRoute exact path="/view/:id" component={ContactCard} />
      <PublicRoute exact path="/login" component={Login} />
      <PublicRoute exact path="/register" component={Register} />
      <Route component={NoMatch} />
    </Switch>
  </BrowserRouter>
);
