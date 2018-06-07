import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Dashboard extends Component {
   render() {
      return (
        <div>
           <h2>Welcome to React Router Tutorial</h2>
           <ul>
              <li><Link to={'/Home'}>Home</Link></li>
              <li><Link to={'/Login'}>Login</Link></li>
           </ul>
         </div>
      );
   }
}
export default Dashboard;
