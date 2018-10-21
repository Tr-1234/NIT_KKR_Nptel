import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { baseUrl, adminUrl , loginUrl } from './urls';
import {
    Redirect,
    Route,
    Switch,
    Link
} from 'react-router-dom';

import axios from 'axios';
import {
  AppBar,
  RaisedButton,
  TextField
} from 'material-ui';

class Login extends Component {

  constructor(props){
    super(props);
    console.log('Login', props);
    this.state={
      name:'',
      password:''
    }
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>

            <AppBar title="Login"/>

            <div style={styles.outerContainerStyle}>
              <div style={styles.innerContainerStyle}>
                <TextField
                  hintText="Enter your name"
                  floatingLabelText="Name"
                  onChange = {(event,newValue) => this.setState({name:newValue, flag: -1})}
                  style={{ marginTop: 10 }}
                />
                <TextField
                  type="password"
                  hintText="Enter Password"
                  floatingLabelText="Password"
                  onChange = {(event,newValue) => this.setState({password:newValue})}
                  style={{ marginTop: -10 }}
                />
                <br/>
                <RaisedButton label="Login" primary={true} style={styles.buttonStyle} onClick={(event) => {this.isPersonPresent(event)}} />
              </div>
            </div>

          </div>

        </MuiThemeProvider>
      </div>
    );
  }

  isPersonPresent(event){

    var that = this;
    var apiUrl = baseUrl + "/users/" + this.state.name + "/password/" + this.state.password;
    axios.get(apiUrl)
    .then(function (response) {
      console.log(response);
      if(response.status == 200){
        console.log("gotcha");
      }
    })
    .catch(function (error) {
      alert(error.response.data.message);
    });

  }

  }

  const styles = {
    outerContainerStyle: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    innerContainerStyle: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      border: '2px solid #00BCD4',
      borderRadius: 25,
      margin: 70,
      padding: 30
    },
    buttonStyle: {
      margin: 15
    }
  };

  export default Login;
