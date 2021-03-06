import React from 'react';
import Modal from 'react-modal';
import Button from './Button';
import {postRequest} from './CallApi'

export default class InviteModal extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      sent: false,
      sending: false
    }
  }

  render() {
    return (
      <Modal
        isOpen={!!this.props.request}
        onRequestClose={this.props.DiscardDetails}
        contentLabel="Project Details"
        className = "modal"
        ariaHideApp={false}
      >
        <h3 className = "modal__header">
        Do you want to send a Collab Request?
        </h3>
        <div className = "modal__details">
            {(this.state.sending)?<p><i className="fa fa-spinner fa-spin"></i>Sending Request..</p>
              :
              <Button onClick=
                {()=>{

                  this.setState({sending:true})
                  postRequest('project/requesttojoin',
                      {
                        'email':window.localStorage.getItem('email'),
                        'password': window.localStorage.getItem('password'),
                        'project_id': this.props.project_id
                      },
                      (res)=>{
                        if(res.message=="FAILURE")
                        {
                          window.alert("Request Not Sent")
                        }
                        else
                        {
                          window.alert("Request Sent")
                        }
                      }
                    )
                    this.props.DiscardDetails()
                }}
                text = "CONFIRM" type = "button modal__button"/>
            }
            <Button onClick={this.props.DiscardDetails} text = "Don't Send" type = "button modal__button"/>
        </div>
      </Modal>
    )
  }
};
