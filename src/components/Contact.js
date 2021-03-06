import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Card, CardContent, CardHeader, CardActions} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailIcon from '@material-ui/icons/Mail';
import GitHubIcon from '@material-ui/icons/GitHub';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  header: {
    fontSize: 15,
    fontColor: 'black'
  },
  root:{
    backgroundColor: 'white',
    Height: 'fit-content',
    Width: 'fit-content'
  },
  subHeader: {
    borderBottom: '0.1rem solid grey',
    fontSize: 12,
    fontColor: 'black'
  },
  title: {
    fontSize: 25,
    color: '#4574bf',
    fontWeight: 400
  },
  content: {
    color: '#4574bf',
    fontSize: 15
  },
  table: {
    width: 'fitContent',
  },
  tableCell: {
    color: '#4574bf',
    fontSize: 15,
  },
  tableRow: {
    "&:hover":{
      backgroundColor: 'black',
      cursor: 'pointer'
    }
  },
  rootIcon: {
    marginLeft: 65
  }
});

export default function Contact(props){

  const classes = useStyles();

  return(
  <Card className = {classes.root}>
    <CardHeader
      classes = {{
        root: classes.header,
        title: classes.title,
        subheader: classes.subHeader
      }}

      action={
        (props.view)?
        ""
        :
        <div className = "tooltip">
          <Link to={'EditProfile'} className = "linklink">
            <IconButton disabled = {props.view}>
              <EditTwoToneIcon style = {{ fontSize: 25, color: "blue" }} />
            </IconButton>
          </Link>
          <span className = "tooltiptext edit">EDIT</span>
        </div>
      }

      title= "Contact Info. & Links"
      subheader = "."
    />
    <CardContent classes = {{root:classes.content}}>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {(props.personal==null||!props.personal.phone ||!props.personal.phone.trim())
                ?  <TableRow classes={{root:classes.tableRow}}>
                      <TableCell classes={{root:classes.tableCell}} component="th" scope="row">
                        Phone No.
                      </TableCell>
                      <TableCell classes={{root:classes.tableCell}} align="left">
                        <i>Not Provided</i>
                      </TableCell>
                    </TableRow>
                : <TableRow classes={{root:classes.tableRow}}
                    onClick = {()=>{
                      const el = document.createElement('textarea');
                      el.value = props.personal.phone;
                      document.body.appendChild(el);
                      el.select();
                      document.execCommand('copy');
                      document.body.removeChild(el);

                      var x = document.getElementById("snackbar");
                      x.className = "show";
                      setTimeout(function(){ x.className = x.className.replace("show", ""); },2000);
                    }}
                  >
                    <TableCell classes={{root:classes.tableCell}} component="th" scope="row">
                      Phone No.
                    </TableCell>
                    <TableCell classes={{root:classes.tableCell}} align="left">
                      {props.personal.phone}
                    </TableCell>
                  </TableRow>
            }
            {(props.personal==null||!props.personal.email ||!props.personal.email.trim())
                ?  <TableRow classes={{root:classes.tableRow}}>
                      <TableCell classes={{root:classes.tableCell}} component="th" scope="row">
                        Email
                      </TableCell>
                      <TableCell classes={{root:classes.tableCell}} align="left">
                        <i>Not Provided</i>
                      </TableCell>
                    </TableRow>
                : <TableRow classes={{root:classes.tableRow}}
                    onClick = {()=>{
                      const el = document.createElement('textarea');
                      el.value = props.personal.email;
                      document.body.appendChild(el);
                      el.select();
                      document.execCommand('copy');
                      document.body.removeChild(el);

                      var x = document.getElementById("snackbar");
                      x.className = "show";
                      setTimeout(function(){ x.className = x.className.replace("show", ""); },2000);
                    }}
                  >
                    <TableCell classes={{root:classes.tableCell}} component="th" scope="row">
                      Email
                    </TableCell>
                    <TableCell classes={{root:classes.tableCell}} align="left">
                      {props.personal.email}
                    </TableCell>
                  </TableRow>
            }
            {(props.personal==null||!props.personal.codeforces ||!props.personal.codeforces.trim())
                ?  <TableRow classes={{root:classes.tableRow}}>
                      <TableCell classes={{root:classes.tableCell}} component="th" scope="row">
                        CodeForces
                      </TableCell>
                      <TableCell classes={{root:classes.tableCell}} align="left">
                        <i>Not Provided</i>
                      </TableCell>
                    </TableRow>
                : <TableRow classes={{root:classes.tableRow}}
                    onClick = {()=>{
                      const el = document.createElement('textarea');
                      el.value = props.personal.codeforces;
                      document.body.appendChild(el);
                      el.select();
                      document.execCommand('copy');
                      document.body.removeChild(el);

                      var x = document.getElementById("snackbar");
                      x.className = "show";
                      setTimeout(function(){ x.className = x.className.replace("show", ""); },2000);
                    }}
                  >
                    <TableCell classes={{root:classes.tableCell}} component="th" scope="row">
                      CodeForces
                    </TableCell>
                    <TableCell classes={{root:classes.tableCell}} align="left">
                      {props.personal.codeforces}
                    </TableCell>
                  </TableRow>
            }
            
            {(props.personal==null||!props.personal.codechef ||!props.personal.codechef.trim())
                ?  <TableRow classes={{root:classes.tableRow}}>
                      <TableCell classes={{root:classes.tableCell}} component="th" scope="row">
                        CodeChef
                      </TableCell>
                      <TableCell classes={{root:classes.tableCell}} align="left">
                        <i>Not Provided</i>
                      </TableCell>
                    </TableRow>
                : <TableRow classes={{root:classes.tableRow}}
                    onClick = {()=>{
                      const el = document.createElement('textarea');
                      el.value = props.personal.codechef;
                      document.body.appendChild(el);
                      el.select();
                      document.execCommand('copy');
                      document.body.removeChild(el);

                      var x = document.getElementById("snackbar");
                      x.className = "show";
                      setTimeout(function(){ x.className = x.className.replace("show", ""); },2000);
                    }}
                  >
                    <TableCell classes={{root:classes.tableCell}} component="th" scope="row">
                      CodeChef
                    </TableCell>
                    <TableCell classes={{root:classes.tableCell}} align="left">
                      {props.personal.codechef}
                    </TableCell>
                  </TableRow>
            }
            
            
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
    <CardActions disableSpacing>
      {
        (props.personal==null||!props.personal.email ||!props.personal.email.trim())?''
        :
        <IconButton classes = {{root:classes.rootIcon}}
          onClick = {()=>{
            const el = document.createElement('textarea');
            el.value = props.personal.email;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);

            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); },2000);
          }}
        >
          <MailIcon style={{ fontSize: 40, color: "#333745" }} />
        </IconButton>
      }
      <div id="snackbar">Copied To Clipboard..</div>

      {(props.personal==null||!props.personal.linkedin ||!props.personal.linkedin.trim())
        ? ''
        :<a target="_blank" className = "linklink" href = {props.personal.linkedin.startsWith("https:\/\/")?props.personal.linkedin:"https://"+props.personal.linkedin}>
          <IconButton>
            <LinkedInIcon style={{ fontSize: 40, color: "#4574bf" }} />
          </IconButton>
        </a>
      }

      {(props.personal==null||!props.personal.github ||!props.personal.github.trim())
        ? ''
        :<a target="_blank"  className = "linklink" href = {props.personal.github.startsWith("https:\/\/")?props.personal.github:"https://"+props.personal.github}>
          <IconButton>
            <GitHubIcon style={{ fontSize: 40, color: "black" }} />
          </IconButton>
        </a>
      }      
    </CardActions>
  </Card>
)}