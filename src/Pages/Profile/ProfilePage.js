import React from 'react';

import Header from '../../components/Header';
import ProjectWidget from '../../components/ProjectWidget';
import HackWidget from '../../components/HackWidget';
import Personal from '../../components/Personal';

export default class ProfilePage extends React.Component {

  render(){
    return(
      <div>
        <Header />
        <div className = "profile__page">
          <div className = "profile__image">
          IMAGE
          </div>
          <div className = "profile__info">
            <div className = "profile__detail">
              <Personal />
              <ProjectWidget/>
            </div>
            <div className = "profile__widget">
              <ProjectWidget showOnlyTitle={true}/>
              <HackWidget />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
