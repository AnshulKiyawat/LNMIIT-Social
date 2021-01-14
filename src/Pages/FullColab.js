import React from "react";
import {postRequest} from '../components/CallApi'
import Request from '../components/Requests';
import Button from "../components/Button";

import Header from '../components/Header';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

export default class FullColab extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      error: false,
      saving: false,
      loader: true,
      admin: false,
      colab_id: '',
      title:'', 
      mentor: " ",
      startDate: null, 
      endDate:null,
      skills_required:'',
      skills: [],
      description:'',
      members: ["Author"],
      member: 1,
      link: '',
      colab: false,
      users: []
    }
  }

  AddSkill = (skill) => {
      this.setState((prevState)=>({
        skills : prevState.skills.concat(skill),
        skills_required : prevState.skills_required.concat(","+skill)
      }))
  }

  DeleteSkill = (index) => {

    let skills = this.state.skills;
    skills.splice(index,1);

    this.setState({skills})
    let new_skill_set = ""
    
    for(var i=0;i<this.state.skills.length;i++)
    {
      if(i>0)
        new_skill_set += ","

      new_skill_set += this.state.skills[i];
    }

    this.setState({skills_required:new_skill_set})
  }

  formatDate = () => {
    var d = new Date(),

    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  componentDidMount(){
    const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);
    
    this.setState({colab_id:res.colabID})

    postRequest('project/getinterestedmembers',
      {
        'email':window.localStorage.getItem('email'),
        'password': window.localStorage.getItem('password'),
        'project_id': res.colabID
      },
      (res)=>{
        if(res.message=="SUCCESS")
        {
          this.setState({users:res.users})
          this.setState({loader:false})
        }
      }
    )

    postRequest('project/getcolabdetails',
      {
        'email':window.localStorage.getItem('email'),
        'password': window.localStorage.getItem('password'),
        'colab_id': res.colabID
      },
      (res)=>{
        if(res.message=="SUCCESS")
        {
          //console.log(res.return_value)
          this.setState(() => (
            {
              admin: res.return_value.admin,
              link:res.return_value.link,
              colab:res.return_value.colab,
              title:res.return_value.title, 
              startDate:res.return_value.startDate, 
              endDate:res.return_value.endDate,
              skills_required:res.return_value.skills_required,
              mentor:res.return_value.mentor,
              description:res.return_value.description
            })
          )

          let skills = this.state.skills_required.split(",")
          this.setState({skills:skills})
          this.setState({loader:false})
        }
      }
    )
  }

  AddTitle = (e) => {
    const title = e.target.value;

    if(this.state.error==true)
    {
      this.setState(() => ({error: false, title}))
    }
    else
      this.setState(() => ({ title }))
  };

  AddDescription = (e) => {
    const description = e.target.value;

    if(this.state.error==true)
    {
      this.setState(() => ({error: false, description}))
    }
    else
      this.setState(() => ({ description }))
  };

  EditDetails = () => {
    this.setState({saving:true})
    if(!this.state.title || !this.state.member || !this.state.description){
      this.setState(() => ({error : true,saving:false}));
    }
    else {
      let colab = this.state

      function formatDate() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
      }

      postRequest('project/editproject',
        {
          'email':window.localStorage.getItem('email'),
          'password': window.localStorage.getItem('password'),
          'project_id': colab.colab_id,
          'title': colab.title,
          'description': colab.description,
          'startDate': formatDate(),
          'endDate':formatDate(),
          'skillsRequired': colab.skills_required,
          'mentor': colab.mentor,
          'members': colab.member,
          'colab': colab.colab,
          'link' : colab.link
        },
        (res)=>{
          if(res.message=="SUCCESS")
          {
            window.location.reload()
          }
        }
      )
    }
  }

  render() {
    return (
      <div>
        <Header logout = {true}/>
        {(this.state.loader)?
          <div className = "loader center"></div>
          :
          <>
          <div className = "collaboration">
          
            <div className = "colab--details">
                <div className = "colab--details-left">
                <div className = "colab--type">
                  <h2>Type</h2>
                  <div className = "colab--type-content">
                    <div>
                      <Checkbox
                        checked= {true}
                        style = {{
                          transform: 'scale(1.5)'
                        }}
                        color = "primary"
                        disabled = {!this.state.admin}
                      />
                      Project
                    </div>
                    <div>
                      <Checkbox
                        checked= {false}
                        style = {{
                          transform: 'scale(1.5)'
                        }}
                        color = "primary"
                        disabled = {!this.state.admin}
                      />
                      Hackathon
                    </div>
                  </div>
                </div>
                <TextField
                  variant = "outlined"
                  style={{
                    marginTop: 20,
                    marginBottom: 5,
                    width: '100%'
                  }}
                  InputProps = {{
                    style: {
                      fontWeight: 300,
                      color: 'black',
                      fontSize: 20
                    }
                  }}
                  InputLabelProps = {{
                    style: {
                      fontWeight: 500,
                      color: 'purple',
                      fontSize: 15
                    }
                  }}
                  label='Title*'
                  onChange = {this.AddTitle}
                  value = {this.state.title}
                  disabled = {!this.state.admin}
                />
                <TextField
                  multiline
                  variant = "outlined"
                  style={{
                    marginTop: 10,
                    marginBottom: 5,
                    width: '100%'
                  }}
                  InputProps = {{
                    style: {
                      fontWeight: 300,
                      color: 'black',
                      fontSize: 20
                    }
                  }}
                  InputLabelProps = {{
                    style: {
                      fontWeight: 500,
                      color: 'purple',
                      fontSize: 15
                    }
                  }}
                  label='Description*'
                  value = {this.state.description}
                  onChange = {this.AddDescription}
                  disabled = {!this.state.admin}
                />
                <TextField
                  variant = "outlined"
                  style={{
                    marginTop: 10,
                    marginBottom: 5,
                    width: '100%'
                  }}
                  InputProps = {{
                    style: {
                      fontWeight: 300,
                      color: 'black',
                      fontSize: 20
                    }
                  }}
                  InputLabelProps = {{
                    style: {
                      fontWeight: 500,
                      color: 'purple',
                      fontSize: 15
                    }
                  }}
                  label='Github'
                  value = {this.state.link}
                  onChange = {(e)=>this.setState({link:e.target.value})}
                  disabled = {!this.state.admin}
                />

                <div className = "colab--skills">
                  <div className = "colab--skills-header">
                    <h2>Skills</h2>
                    { (this.state.admin)?
                    <form onSubmit = {(e)=>{
                        e.preventDefault();
                        
                        const skill = e.target.skill.value;
                        e.target.skill.value = ""; 
                        
                        if(skill)
                          this.AddSkill(skill)
                      }}
                    >
                      <TextField
                        id = "skill"
                        style={{
                          width: '100%',
                          height: 'fitContent'
                        }}
                        InputProps = {{
                          style: {
                            color: 'black',
                            fontSize: 15
                          }
                        }}
                        variant = "outlined"
                        placeholder = "Add a Skill..."
                        autoComplete = "off"
                      />
                    </form>
                    :""
                    }
                  </div>
                  <div className = "colab--skills-content">
                  {
                    (this.state.skills.length==0)?
                      "No Skill Requirements"
                    :
                      this.state.skills.map((skill,index)=>(
                        <div className="skill--chip" key = {index}>
                          {skill}
                        {
                          (this.state.admin)?
                          <span className = "button--close" onClick = {()=>{this.DeleteSkill(index)}}>x</span>
                          :""
                        }
                        </div>
                      ))
                  }
                  </div>
                </div>
              </div>

                <div className = "colab--details-right">
                  <TextField
                    type = "date"
                    defaultValue = {this.formatDate()}
                    variant = "outlined"
                    style={{
                      marginBottom: 5,
                      width: "100%"
                    }}
                    InputProps = {{
                      style: {
                        fontWeight: 300,
                        color: 'black',
                        fontSize: 20
                      }
                    }}
                    InputLabelProps = {{
                      style: {
                        fontWeight: 500,
                        color: 'purple',
                        fontSize: 15
                      }
                    }}
                    label='Start Date'
                    disabled = {!this.state.admin}
                  />
                  <TextField
                    type = "date"
                    defaultValue = {this.formatDate()}
                    variant = "outlined"
                    style={{
                      marginTop: 10,
                      marginBottom: 5,
                      width: "100%"
                    }}
                    InputProps = {{
                      style: {
                        fontWeight: 300,
                        color: 'black',
                        fontSize: 20
                      }
                    }}
                    InputLabelProps = {{
                      style: {
                        fontWeight: 500,
                        color: 'purple',
                        fontSize: 15
                      }
                    }}
                    label='End Date'
                    disabled = {!this.state.admin}
                  />
                
                <TextField
                  variant = "outlined"
                  style={{
                    marginTop: 10,
                    marginBottom: 5,
                    width: '100%'
                  }}
                  InputProps = {{
                    style: {
                      fontWeight: 300,
                      color: 'black',
                      fontSize: 20
                    }
                  }}
                  InputLabelProps = {{
                    style: {
                      fontWeight: 500,
                      color: 'purple',
                      fontSize: 15
                    }
                  }}
                  label='Mentor'
                  value = {this.state.mentor}
                  onChange = {(e)=>this.setState({mentor:e.target.value})}
                  disabled = {!this.state.admin}
                />

                <div className = "colab--members">
                  <h2>Members : 1</h2>
                  <div className = "colab--members-content">
                    
                    {
                      this.state.members.map((member,index)=>(
                        <div className="member--chip" key = {index}>
                          {member}
                          {/*If Author/Admin */}
                          <div className = "admin--tag">ADIM</div>
                        </div>
                      ))
                    }
                    
                  </div>
                </div>
              </div>
            </div>  

            <div className = "colab--requests">
            {
              (this.state.admin)?
                <div>
                <Checkbox
                  checked= {this.state.colab}
                  style = {{
                    transform: 'scale(1.5)'
                  }}
                  onChange = {(e)=>{
                    this.setState({colab:e.target.checked})    
                  }}
                  color = "primary"
                />
                Invite Collaborations
                <Request users = {this.state.users} id = {this.state.colab_id}/>
                </div>
              :
              <Button text = "Send Colab Request" type = "button colab--button"/>
            }
            </div>
          </div>
          <center>
          { (this.state.error)?
            <p className = "error">Please Enter all Details Marked *</p>
            :""
          }
          {
            (this.state.admin)?
              (this.state.saving)?
              <p><i className="fa fa-spinner fa-spin"></i>..Saving Changes</p>
              :
              <Button text = "Save Changes" type = "button" onClick = {this.EditDetails}/>
            :""
          }
          </center>
          </>
        }
      </div>
    );
  }
}