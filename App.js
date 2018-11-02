import React from 'react';
import {
    Redirect,
    Route,
    Switch
} from 'react-router-dom';

import Login from './logins';
import AdminHome from './admin/AdminHome';
import StudentHome from './student/StudentHome';

export default function App(props) {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/admin" exact component ={ AdminHome } />
        <Route path="/student" exact component ={ StudentHome } />
      </Switch>
    </div>
  )
};
