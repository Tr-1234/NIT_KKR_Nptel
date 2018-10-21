import React from 'react';
import {
    Redirect,
    Route,
    Switch
} from 'react-router-dom';

import Login from './logins';
import AdminHome from './admin/AdminHome';

export default function App(props) {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/admin" exact component ={ AdminHome } />
      </Switch>
    </div>
  )
};
