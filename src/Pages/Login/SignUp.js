import React from 'react';
import { Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '../../components/Button';
import Header from '../../components/Header';
import {postRequest} from '../../components/CallApi'

export default class SignUp extends React.Component
{
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      firstName:'',
      middleName:'',
      lastName:'',
      errorMessage:''
    };
  }
  render()
  {
    return(
      <div>
      <Header/>
      <div className = "center signup">

        <p className = "signup__byline">REGISTER and Connect Your Skills</p>
        <TextField
          variant = "filled"
          style={{
            marginTop: 5,
            marginBottom: 5
          }}
          InputProps = {{
            style: {
              fontWeight: 300,
              color: 'white',
              fontSize: 20
            }
          }}
          InputLabelProps = {{
            style: {
              fontWeight: 500,
              color: 'white',
              fontSize: 15
            }
          }}
          defaultValue={this.state.email}
          onChange={(e)=>{this.setState({email:e.target.value})}}
          label='Email'
        />

        <div className = "signup__details">
          <TextField
            variant = "filled"
            style={{
              marginRight: 5,
              marginTop: 5,
              marginBottom: 5
            }}
            InputProps = {{
              style: {
                fontWeight: 300,
                color: 'white',
                fontSize: 20
              }
            }}
            InputLabelProps = {{
              style: {
                fontWeight: 500,
                color: 'white',
                fontSize: 15
              }
            }}
            defaultValue={this.state.firstName}
            onChange={(e)=>{this.setState({firstName:e.target.value})}}
            label='First Name'
          />
          <TextField
            variant = "filled"
            style={{
              marginRight: 5,
              marginTop: 5,
              marginBottom: 5
            }}
            InputProps = {{
              style: {
                fontWeight: 300,
                color: 'white',
                fontSize: 20
              }
            }}
            InputLabelProps = {{
              style: {
                fontWeight: 500,
                color: 'white',
                fontSize: 15
              }
            }}
            defaultValue={this.state.middleName}
            onChange={(e)=>{this.setState({middleName:e.target.value})}}
            label='Middle Name'
          />
          <TextField
            variant = "filled"
            style={{
              marginLeft: 5,
              marginTop: 5,
              marginBottom: 5
            }}
            InputProps = {{
              style: {
                fontWeight: 300,
                color: 'white',
                fontSize: 20
              }
            }}
            InputLabelProps = {{
              style: {
                fontWeight: 500,
                color: 'white',
                fontSize: 15
              }
            }}
            onChange={(e)=>{this.setState({lastName:e.target.value})}}
            defaultValue={this.state.lastName}
            label='Last Name'
          />
        </div>

        <TextField
          variant = "filled"
          style={{
            marginTop: 5,
            marginBottom: 5
          }}
          InputProps = {{
            style: {
              fontWeight: 300,
              color: 'white',
              fontSize: 20
            }
          }}
          InputLabelProps = {{
            style: {
              fontWeight: 500,
              color: 'white',
              fontSize: 15
            }
          }}
          onChange={(e)=>{this.setState({password:e.target.value})}}
          defaultValue={this.state.password}
          label='Password'
          type="password"
        />
        <div>
          {this.state.errorMessage}
        </div>
        <div className = "signup__connect">
        <Button text='Connect'
                type = 'button signup__button'
                onClick = {()=>postRequest('login/signup',
                                           {
                                             'email':this.state.email,
                                             'firstName': this.state.firstName,
                                             'middleName': this.state.middleName,
                                             'lastName': this.state.lastName,
                                             'password': this.state.password
                                           },
                                           (res)=>{
                                             window.alert(res.message)
                                             this.setState({errorMessage:res.reason})
                                           }
                )}
        />
        </div>
      </div>
      </div>
    );
};
};
