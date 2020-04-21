import React from 'react';

import TextField from '@material-ui/core/TextField';
import Header from '../../components/Header';
import Button from '../../components/Button';

export default class ForgotPassword extends React.Component
{
  render()
  {
    return(
      <div>
        <Header />
        <div className = "center fpwd">
          <TextField
            variant = "filled"
            style={{
              width: 400,
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
            defaultValue=''
            label='Email'
          />
            
          <TextField
            variant = "filled"
            style={{
              marginTop: 3,
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
            defaultValue=''
            label='New Password'
          />
          
          <TextField
            variant = "filled"
            style={{
              marginTop: 3,
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
            defaultValue=''
            label='Confirm Password'
          />

          <Button text='Submit' type = 'button fpwd__button' />

        </div>
      </div>
    );
  }
}
