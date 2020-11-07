import React from 'react';
import Modal from 'react-modal';

import TextField from './TextField';
import Button from './Button';
import DatePicker from '../components/DatePicker'
import {postRequest} from './CallApi'

const Details = (props) => (
  <div>
    <TextField
      disabled = {!props.edit}
      default = {props.title}
      label = "Title"
      FeildStyle = {{
        width: 275,
        marginTop: 5,
        marginBottom: 5
      }}
      inputprops = {{
        style: {
          fontWeight: 300,
          color: 'white',
          fontSize: 20
        }
      }}
      LabelStyle = {{
        style: {
          fontWeight: 500,
          color: 'white',
          fontSize: 15
        }
      }}
      Change = {props.AddTitle}
    />

    <TextField
      disabled = {!props.edit}
      default = {props.member}
      label = "Members"
      inputprops = {{
        style: {
          fontWeight: 300,
          color: 'white',
          fontSize: 20
        },
        type: 'Number'
      }}
      FeildStyle = {{
        width: 275,
        marginTop: 5,
        marginBottom: 5
      }}
      LabelStyle = {{
        style: {
          fontWeight: 500,
          color: 'white',
          fontSize: 15
        }
      }}
      Change = {props.AddMembers}
    />
    <DatePicker
      disabled = {!props.edit}
      value = {props.startDate}
      label = "Start Date"
      inputprops = {{
        style: {
          fontWeight: 300,
          color: 'white',
          fontSize: 20
        },
      }}
      format = "dd-MM-yyyy"
      FeildStyle = {{
        width: 275,
        marginTop: 5,
        marginBottom: 5
      }}
      LabelStyle = {{
        style: {
          fontWeight: 500,
          color: 'white',
          fontSize: 15
        }
      }}
      onChange = {props.AddStartDate}
    />
    <DatePicker
      disabled = {!props.edit}
      value = {props.endDate}
      format = "dd-MM-yyyy"
      label = "End Date"
      inputprops = {{
        style: {
          fontWeight: 300,
          color: 'white',
          fontSize: 20
        },
      }}
      FeildStyle = {{
        width: 275,
        marginTop: 5,
        marginBottom: 5
      }}
      LabelStyle = {{
        style: {
          fontWeight: 500,
          color: 'white',
          fontSize: 15
        }
      }}
      onChange = {props.AddEndDate}
    />
    <TextField
      disabled = {!props.edit}
      default = {props.requirements}
      label = "Requirements (or skills??)"
      inputprops = {{
        style: {
          fontWeight: 300,
          color: 'white',
          fontSize: 20
        },
      }}
      FeildStyle = {{
        width: 275,
        marginTop: 5,
        marginBottom: 5
      }}
      LabelStyle = {{
        style: {
          fontWeight: 500,
          color: 'white',
          fontSize: 15
        }
      }}
      Change = {props.AddRequirements}
    />
    <TextField
      disabled = {!props.edit}
      default = {props.mentor}
      label = "Mentor"
      FeildStyle = {{
        width: 275,
        marginTop: 5,
        marginBottom: 5
      }}
      inputprops = {{
        style: {
          fontWeight: 300,
          color: 'white',
          fontSize: 20
        }
      }}
      LabelStyle = {{
        style: {
          fontWeight: 500,
          color: 'white',
          fontSize: 15
        }
      }}
      Change = {props.AddMentor}
    />
    <TextField
      disabled = {!props.edit}
      default = {props.description}
      label = "Description"
      multiline
      FeildStyle = {{
        width: 275,
        marginTop: 5,
        marginBottom: 5
      }}
      inputprops = {{
        style: {
          fontWeight: 300,
          color: 'white',
          fontSize: 20
        }
      }}
      LabelStyle = {{
        style: {
          fontWeight: 500,
          color: 'white',
          fontSize: 15
        }
      }}
      Change = {props.AddDescription}
    />
  </div>
)

export default class HackModal extends React.Component {

  state = {
    title: null,
    description: null,
    startDate: null,
    endDate: null,
    mentor: null,
    requirements: null,
    member: 0,
    error: false
  };


  componentDidMount() {
    try {
      if(this.props.showDetail){
        this.setState(() => ({
          title : this.props.hack.title,
          description: this.props.hack.description,
          startDate: this.props.hack.startDate,
          endDate: this.props.hack.endDate,
          requirements: this.props.hack.requirements,
          member: this.props.hack.member,
          mentor: this.props.hack.mentor
        }))
      }
    } catch(e) {
      console.log(e);
    }
  }

  FixError = () => {
    this.setState(() => ({error : false}));
  }

  AddHackTitle = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }))
  };

  AddHackDescription = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }))
  };

  AddHackStartDate = (date) => {
    const startDate = date;
    this.setState(() => ({ startDate }))
  };

  AddHackEndDate = (date) => {
    const endDate = date;
    this.setState(() => ({ endDate }))
  };

  AddHackRequirements = (e) => {
    const requirements = e.target.value;
    this.setState(() => ({ requirements }))
  };


  AddHackMentor = (e) => {
    const mentor = e.target.value;
    this.setState(() => ({ mentor }))
  };

  AddHackMembers = (e) => {
    const member = e.target.value;

    this.setState(() => ({ member }));
  };

  SaveDetails = () => {

    if(!this.state.title || !this.state.description || !this.state.member || !this.state.mentor || !this.state.requirements || !this.state.startDate || !this.state.endDate){
      this.setState(() => ({error : true}));
    }
    else {
      let hack = this.state
      this.props.SubmitDetails(hack,this.props.editDetail,this.props.hack.index);

      function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
      }

      postRequest('hack/createhack',
                  {
                    'email':window.localStorage.getItem('email'),
                    'password': window.localStorage.getItem('password'),
                    'title': hack.title,
                    'description': hack.description,
                    'startDate': formatDate(hack.startDate),
                    'endDate':formatDate(hack.endDate),
                    'skillsRequired': hack.requirements,
                    'mentor': hack.mentor,
                    'members': hack.member
                  },
                  (res)=>{
                    if(res.message=="SUCCESS")
                    {
                      console.log('SUCCESS')
                    }
                  }
      )
    }
  }

  render() {
    return (
      <Modal
        isOpen={!!this.props.openModal}
        onRequestClose={this.props.DiscardDetails}
        contentLabel="Hack Details"
        className = "modal"
        ariaHideApp={false}
      >
        <h3 className = "modal__header">
        Hack Details
        <Button text = "X" type = "close__button" onClick = {this.props.DiscardDetails} />
        </h3>
        {
          (this.state.error)?
          <div>
          <p className = "modal__body">Please Enter All Valid Details</p>
          <Button text = "Continue" type = "button continue__button" onClick = {this.FixError} />
          </div>
          :
          <div>
          <Details
            edit = {(this.props.addDetail || this.props.editDetail) || !this.props.showDetail}
            title = {this.state.title}
            description = {this.state.description}
            startDate = {this.state.startDate}
            endDate = {this.state.endDate}
            requirements = {this.state.requirements}
            member = {this.state.member}
            mentor = {this.state.mentor}
            AddTitle = {this.AddHackTitle}
            AddDescription = {this.AddHackDescription}
            AddStartDate = {this.AddHackStartDate}
            AddEndDate = {this.AddHackEndDate}
            AddRequirements = {this.AddHackRequirements}
            AddMentor = {this.AddHackMentor}
            AddMembers = {this.AddHackMembers}
          />
          {
            (this.props.showDetail)?
            <div>
            <Button text = "EDIT" type = "button modal__button" onClick = {() => {this.props.EditDetails()}}/>
            <Button text = "DELETE" type = "button modal__button" onClick = {() => {this.props.DeleteHack(this.props.hack.index)}} />
            </div>
            :
            <div>
              <Button text = "Save Details" type = "button modal__button" onClick = {this.SaveDetails}/>
              <Button text = "Discard Details" type = "button modal__button" onClick = {this.props.DiscardDetails}/>
            </div>
          }
          </div>
        }
      </Modal>
    )
  }
};
