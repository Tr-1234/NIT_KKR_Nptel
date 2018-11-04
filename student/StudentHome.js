import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Select from 'react-select';
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
  professorUrl,
  linkidUrl
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
      professor_name_array:[],
      courseName: null,
      professorName: null,
      disciplineName: null,
      code: '',
      phase: '',
      code_array:[],
      flag:0,

    }
  };

  componentDidMount(){
    this.fetchDiscipline(event);
  }


  render() {
       var link = "https://media.w3.org/2010/05/sintel/trailer_hd.mp4";
       //var link = "./../Videos/spider.mp4";

    return (
      <div>
        <MuiThemeProvider>
          <div>

            <AppBar title="Student Home"/>
            <br/><br/>
            <p>Discipline Name</p>
              <Select
                name={this.state.disciplineName}
                value={this.state.disciplineName}
                onChange={(val)=>{
                  this.setState({disciplineName: val});
                  this.fetchCourse(event, val.value);
                  }
                }
                options={this.state.discipline_name_array}
              />
             {
               this.state.course_name_array.length != 0 ?
                  <div>
                   <p>Course Name</p>
                     <Select
                       name={this.state.courseName}
                       value={this.state.courseName}
                       onChange={(val)=>{
                         this.setState({courseName: val});
                       this.fetchProfessor(event, val.value);
                     }}
                       options={this.state.course_name_array}
                     />
                 </div>
                   :null
             }

              {
                this.state.professor_name_array.length != 0 ?

                    <div>
                    <p>Professor Name</p>
                      <Select
                        name={this.state.professorName}
                        value={this.state.professorName}
                        onChange={(val)=>this.setState({professorName: val})}
                        options={this.state.professor_name_array}
                      />
                  </div>
                     :null

              }

              <RaisedButton label="Search" primary={true} style={styles.buttonStyle} onClick={(event) => {this.Search(event)}} />
              <br/>
            {
                this.state.flag == 2 ?
                  <video
                    controls
                    src= {link}
                    autoPlay = {true}
                    height={300} widht={500}/>
                   :null

              }
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
      var temp = [];
      response.data.map(x=>{
        temp.push({label: x.Discipline_Name, value: x.Discipline_Name});
      });
      that.setState({ discipline_name_array: temp });
    })
    .catch(error => {
      console.log(error.response);
      alert(error.response.data.message);
    });

  }

  fetchCourse(event, disciplineName){
    console.log("fetchCourse");
    var that = this;
    let apiUrl = baseUrl+courseUrl.replace(":discipline_name",disciplineName);

    axios.get(apiUrl)
    .then( response => {
      var temp = [];
      response.data.map(x=>{
        temp.push({label: x.Course_Name, value: x.Course_Name});
      });
      that.setState({ course_name_array: temp });
    })
    .catch(error => {
      console.log(error.response);
      alert(error.response.data.message);
    });

  }


    fetchProfessor(event, courseName){
      console.log("fetchProfessor");
      var that = this;
      let apiUrl = baseUrl+professorUrl.replace(":course_name",courseName);

      axios.get(apiUrl)
      .then( response => {
        var temp = [];
        response.data.map(x=>{
          temp.push({label: x.Professor_Name, value: x.Professor_Name});
        });
        that.setState({ professor_name_array: temp });
      })
      .catch(error => {
        console.log(error.response);
        alert(error.response.data.message);
      });

    }

    Search(event){

      var that = this;
    //  var apiUrl = baseUrl + "/users/" + this.state.name + "/password/" + this.state.password;
      var apiUrl = baseUrl + linkidUrl.replace(":professor_name",that.state.professorName.value).replace(":course_name",that.state.courseName.value);

      axios.get(apiUrl)
      .then(function (response) {
        console.log(response);
        if(response.status == 200){
            that.setState({
              code : response.data.Course_ID ,
              phase : response.data.Phase,
              flag: 2
            });

            console.log(that.state.code);
            console.log(that.state.phase);
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
