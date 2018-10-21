import React from 'react';
import {
    Redirect,
    Route,
    Switch
} from 'react-router-dom';

import Login from './logins';

export default function App(props) {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Login} />
      </Switch>
    </div>
  )
};
