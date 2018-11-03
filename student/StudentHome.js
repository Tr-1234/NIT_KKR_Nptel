import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    Redirect,
    Route,
    Switch,
    Link
} from 'react-router-dom';

import {
  baseUrl,
  disciplineUrl,
  courseUrl,
  professorUrl
} from './../urls';

import axios from 'axios';

import {
  AppBar,
  RaisedButton,
  TextField, IconButton, SvgIcon,
  Dialog,
  FlatButton
} from 'material-ui';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


export default class StudentHome extends Component {

  constructor(props){
    super(props);
    console.log('Login', props);
    this.state={
      name:'',
      password:'',
      discipline_name_array:[],
      course_name_array:[],
      professor_name_array:[]
    }
  };

  componentDidMount(){
    this.fetchDiscipline(event);
    this.fetchCourse(event);
    this.fetchProfessor(event);

  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>

            <AppBar title="Student Home"/>


          </div>
        </MuiThemeProvider>
      </div>
    );
  }

  fetchDiscipline(event){
    console.log("fetchDiscipline");
    var that = this;
    let apiUrl = baseUrl+disciplineUrl;

    axios.get(apiUrl)
    .then( response => {
      console.log(response);
      that.setState({ discipline_name_array: response.data });
    })
    .catch(error => {
      console.log(error.response);
      alert(error.response.data.message);
    });

  }

  fetchCourse(event){
    console.log("fetchCourse");
    var that = this;
    let apiUrl = baseUrl+courseUrl;

    axios.get(apiUrl)
    .then( response => {
      console.log(response);
      that.setState({ course_name_array: response.data });
    })
    .catch(error => {
      console.log(error.response);
      alert(error.response.data.message);
    });

  }


    fetchProfessor(event){
      console.log("fetchProfessor");
      var that = this;
      let apiUrl = baseUrl+professorUrl;

      axios.get(apiUrl)
      .then( response => {
        console.log(response);
        that.setState({ professor_name_array: response.data });
      })
      .catch(error => {
        console.log(error.response);
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
