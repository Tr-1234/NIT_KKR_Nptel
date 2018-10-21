import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import * as MaterialIcon from 'react-icons/md';
import AdminPalette from './AdminPalette';

import {
  baseUrl ,
  profileUrl ,
  adminUrl ,
  insertUrl
} from './../urls';

import {
  AppBar,
  RaisedButton,
  TextField, IconButton, SvgIcon,
  Dialog,
  FlatButton
} from 'material-ui';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class AdminHome extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      responseDataArray:[],
      code:'',
      course_name:'',
      author:'',
      name:'',
      password:'',
      flag:0
    }
  };

  clearFields(){
    this.setState({
      code :        '' ,
      author :      '',
      course_name : '',
      name :        '',
    });
  }

  render() {

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Admin Home" width="50%"/>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
              <AdminPalette
                onClickInsert={() => this.setState({flag :1})}
                onClickDelete = {() => this.setState({flag :2})}
                onClickGet_Data={() => this.setState({flag : 3})}
                onClickProfile={() => this.getProfileInfo(this)}
                onClickLogout={() => this.logout()}
              />

              { this.insertRecord() }
              { this.showProfile() }


            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );



  }



    insertRecord = () => {

      if(this.state.flag == 1)
      {
        return (

          <div style={styles.outerContainerStyle}>
            <span style={styles.headingStyle}>Insert Record</span>
            <div style={styles.innerContainerStyle}>
                  <TextField
                    hintText="Name"
                    floatingLabelText="Name"
                    value = {this.state.name}
                    onChange = {(event,newValue) => this.setState({name:newValue })}
                    style={styles.textFieldStyle}
                  />
                  <TextField
                    hintText="Course Name"
                    floatingLabelText="Course Name"
                    value = {this.state.course_name}
                    onChange = {(event,newValue) => this.setState({course_name:newValue })}
                    style={styles.textFieldStyle}
                  />
                  <TextField
                    hintText="Author"
                    floatingLabelText="Author"
                    value = {this.state.author}
                    onChange = {(event,newValue) => this.setState({author:newValue })}
                    style={styles.textFieldStyle}
                  />
                  <TextField
                    hintText="Code"
                    floatingLabelText="Code"
                    value = {this.state.code}
                    onChange = {(event,newValue) => this.setState({code:newValue })}
                    style={styles.textFieldStyle}
                  />

                  <RaisedButton label="Insert Record" primary={true} style={styles.buttonStyle} onClick={(event) => {this.insert(event)}} />

              </div>
            </div>
          </div>

        );
      }
    }


  showProfile = () => {
    if(this.state.flag == 10)
    return(
      <div style={styles.outerContainerStyle}>
        <span style={styles.headingStyle}>My Profile</span>
        <div style={styles.innerContainerStyle}>
          <div style={styles.childContainer}>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdPerson size={styles.iconSize} style={styles.iconStyle} />
              <TextField
                hintText="Enter name"
                floatingLabelText="Name"
                value = {this.state.name}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdLockOpen size={styles.iconSize} style={styles.iconStyle} />
              <TextField
                hintText="Enter password"
                floatingLabelText="Password"
                value = {this.state.password}
                style={styles.textFieldStyle}
              />
            </div>

          </div>
        </div>
      </div>
    );
  }



  logout(){
    this.props.history.replace({
      pathname : '/'
    });
  }

  insert(event){
    var that=this;

    if(
      that.state.code == '' ||
      that.state.course_name == '' ||
      that.state.author == '' ||
      that.state.name == '' ||
    ){
      alert("Required fields shouldn't be empty!!");
      return;
    }

    var apiUrl=baseUrl + insertUrl;

    var body = {
      "name" :         that.state.name ,
      "course_name" :  that.state.course_name,
      "author" :       that.state.author,
      "code" :         that.state.code

    };

    console.log(body);
    axios.post(apiUrl,body)
   .then(response => {
       if(response.status == 200){
          that.clearFields();
         }
         else if(response.status == 204) {
           alert("Record is already present!");
         }
      })
   .catch(error => {
     alert(error.response.data.message);
   });

  }


  getProfileInfo(event){

    var apiUrl = baseUrl + profileUrl;
    var that=this;
    axios.get(apiUrl)
    .then(function (response) {
      console.log(response);
      if(response.status == 200){
          that.setState({name : response.data.name, password: response.data.password, flag:10});

      }
      else if(response.status == 404) {
        alert("No user found ");
      }
    })
    .catch(function (error) {
        alert(error.response.data.message);
    })
  }

}

const styles = {
  outerContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex : 1
  },
  innerContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 20,
    width : '80%'
  },
  innerContainerStyleUpdate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
    width : '80%',
  },
  childContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
    padding: 20
  },
  buttonStyle: {
    margin: 0
  },
  itemHeaderContainer: {
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent: 'space-around',
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
  textCellContainer: {
    flex : 1,
    textAlign : 'center'
  },
  BoldText:{
    fontWeight : 'Bold'
  },
  corrigendumLabel: {
    fontFamily: 'Montserrat',
    fontWeight: 'Bold',
    color: '#ff5719',
    fontSize : '18px',
    flex : 2
  },
  textLabel:{
    fontFamily: 'Montserrat',
    fontWeight: 'Bold',
    color: '#006266'
  },
  ICLabel:{
    fontFamily: 'Montserrat',
    fontWeight: 'Bold',
    color: '#FF1493',
    fontSize : '20px'
  },
  textStyle:{
    fontFamily: 'Montserrat',
    fontSize: '14px',
    color: '#009432',
    margin: '2px'
  },
  boxStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  icBoxStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems : 'left',
    marginLeft : '60px'
  },
  comboStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    margin: 15,
    alignItems: 'center'
  },
  purchaseOrderContainer: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #aaa69d',
    borderRadius: 4,
    margin: 8,
    padding: 8
  },
  dividerStyle: {
    height: '1px',
    backgroundColor: '#d1ccc0',
    margin: '4px',
    marginTop: 10
  },
  iconSize: 18,
  textFieldStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: -10
  },
  textCellStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems : 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  iconStyle: {
    marginTop: 18
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
  buttonContainerStyle: {
    display: 'flex',
    flexDirection:'row',
    justifyContent:'flex-end',
    margin: 12
  },
  initiatedStyle: {
    backgroundColor : 'rgb(255,153,0)',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  inProgressStyle: {
    backgroundColor : 'rgb(50,70,195)',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  IRPartialStyle: {
    backgroundColor : '#420420',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  processedStyle: {
    backgroundColor : 'rgb(50,220,50)',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  forwardedStyle: {
    backgroundColor : 'rgb(255, 75, 100)',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  assignedStyle: {
    backgroundColor : 'rgb(180, 75, 12)',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  intimatedStyle: {
    backgroundColor : 'rgb(193, 181, 12)',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  visitedStyle: {
    backgroundColor : 'rgb(94, 13, 193)',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  passedStyle: {
    backgroundColor : '#13B47E',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  rejectedStyle: {
    backgroundColor : '#FF0000',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  approvedStyle: {
    backgroundColor : '#33FF00',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  dispatchedStyle: {
    backgroundColor : '#663399',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  itemAcceptedStyle: {
    backgroundColor : '#FFCC00',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  itemRejectedStyle: {
    backgroundColor : '#CC0000',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  amendmentRequestedStyle: {
    backgroundColor : '#809BBD',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  nominatedStyle: {
    backgroundColor : '#D683B2',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  generatedStyle: {
    backgroundColor : '#00CCFF',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  finishedStyle: {
    backgroundColor : '#99FF00',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  }
};
