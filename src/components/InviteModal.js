import React from 'react';
import Modal from 'react-modal';
import Button from './Button';
import {postRequest} from './CallApi'
import LoginContext from '../contexts/LoginContext';


export default class InviteModal extends React.Component {
  render() {
    return (
      <LoginContext.Consumer>
      {(loginData)=>{return (
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
            <Button onClick=
              {()=>{
                postRequest('project/requesttojoin',
                    {
                      'email':loginData.email,
                      'password': loginData.password,
                      'project_id': this.props.project_id
                    },
                    (res)=>{
                      if(res.message=="FAILURE")
                      {
                        alert("ERROR:"+res.reason)
                      }
                      else
                      {
                        alert("SUCCESS. Admins notified")
                      }
                      this.props.DiscardDetails()

                    }
                  )
                
              }}
              text = "CONFIRM" type = "button modal__button"/>
            <Button onClick={this.props.DiscardDetails} text = "Don't Send" type = "button modal__button"/>
        </div>
      </Modal>
      )}}
    </LoginContext.Consumer>
    )
  }
};
