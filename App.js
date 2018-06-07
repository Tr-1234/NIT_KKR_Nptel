import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Dashboard from './Dashboard';

class App extends Component {
   render() {
      return (
         <Router>
           <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route exact path='/Home' component={Home} />
              <Route exact path='/Login' component={Login} />
           </Switch>
         </Router>
      );
   }
}
export default App;
