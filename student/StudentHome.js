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
  linkidUrl,
  allLinkUrl
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
import spider from './../Videos/spider.mp4';

export default class StudentHome extends Component {

  constructor(props){
    super(props);
    console.log('Login', props);
    this.state={
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
      links:[]

    }
  };

  componentDidMount(){
    this.fetchDiscipline(event);
  }


  render() {
       var link = "files://";
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
                      <div style={{flex : 1}}>
                        <div style = {styles.outerContainerStyle}>
                          <span style={styles.headingStyle}>List of Links</span>
                        </div>
                        <div style={styles.itemHeaderContainer}>
                          <span style={styles.textCellContainer}>S.No.</span>
                          <span style={styles.textCellContainer}>Link</span>
                        </div>
                        {
                          this.state.links.map((member,key) => {
                            return (
                              <div key={key} style={styles.itemContainer}>
                                <span style={styles.textCellContainer}>{key+1}</span>
                                <span style={styles.textCellContainer}><a href={member}>{member}</a></span>
                              </div>
                            )
                          })
                        }
                        <video controls src={spider} />
                      </div>
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
            });
             that.fetchAllLinks();
            console.log(that.state.code);
            console.log(that.state.phase);
          }
        })
      .catch(function (error) {
        alert(error.response.data.message);
      });

  }
  fetchAllLinks(){

    var that = this;
    let apiUrl = baseUrl+allLinkUrl.replace(":course_id",that.state.code);
    console.log("fetchAllLinks");

    axios.get(apiUrl)
    .then( response => {
      console.log(response);
    
      that.setState({ links: response.data.files ,
       flag :2 });
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
    textCellContainer: {
      flex : 1,
      textAlign : 'left'
    },
    headingStyle: {
      textAlign : 'center',
      width : '100%',
      fontFamily: 'Montserrat',
      fontSize: '22px',
      marginTop : 10,
      fontWeight: 'Bold',
      color: '#006266'
    },
    itemHeaderContainer: {
      display : 'flex',
      flexDirection : 'row',
      alignItems : 'left',
      backgroundColor: '#f5cd79',
      borderRadius: 2,
      margin: 5,
      padding: 5
    },
    itemContainer: {
      display : 'flex',
      flexDirection : 'row',
      alignItems : 'center',
      justifyContent: 'space-around',
      borderBottom: '1px solid #aaa69d',
      margin: 5,
      padding: 5
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
