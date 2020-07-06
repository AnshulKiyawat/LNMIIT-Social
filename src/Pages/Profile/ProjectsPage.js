import React from 'react';

import Button from '../../components/Button';
import Header from '../../components/Header';
import ProjectModal from '../../components/ProjectModal';
import WorkView from '../../components/WorkView';

import { Card, CardActions, CardContent, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#20222b',
    marginBottom: '0.25rem',
    height: 'fit-content',
    padding: '0 0.3rem 0 0.3rem'
  },
  title: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  }
});

const PageHeader = (props) => (
  <Card className = {useStyles().header}>
    <CardContent>
      <Typography className = {useStyles().title}>
        Projects
      </Typography>
    </CardContent>
    <CardActions>
      <Button text = "+Add"  onClick = {props.newProject} type = "project__button"/>
    </CardActions>
  </Card>
)

export default class ProjectsPage extends React.Component {
  state = {
    projects: [],
    openModal: false,
    addDetail: false,
    showDetail: false,
    editDetail: false,
    project: {
      index: -1,
      title: null,
      description: null,
      startDate: null,
      endDate: null,
      requirements: null,
      mentor:null,
      member: 0
    }
  };

  AddDetail = () => {
    this.setState(() => ({
      openModal: true,
      addDetail: true
    }));
  }

  ShowDetails = (index) => {
    let pro = this.state.projects[index];

    this.setState(() => ({
      project: {
        index: index,
        title: pro.title,
        description: pro.description,
        startDate: pro.startDate,
        endDate: pro.endDate,
        requirements: pro.requirements,
        mentor: pro.mentor,
        member: pro.member
      },
      showDetail: true,
      openModal: true
    }))
  }

  EditDetails = () => {
    this.setState(() => ({
      showDetail: false,
      editDetail: true,
      openModal: true
    }))
  }

  SubmitDetails = (project,edit,index) => {

    if(!edit){
      this.setState((prevSate) => ({
        projects: prevSate.projects.concat(project),
        addDetail: false,
        editDetail: false,
        openModal: false
      }));
    }
    else{
      this.setState(() => ({
        addDetail: false,
        editDetail: false,
        openModal: false
      }));

      this.state.projects[index] = project;
    }
  };

  DiscardDetails = () => {
    this.setState(() => ({
      addDetail:false,
      editDetail: false,
      showDetail: false,
      openModal: false
    }))
  }

  EditProject = (index) => {
    console.log(index)
  }

  DeleteProject = (projectIndex) => {
    let projects=this.state.projects;
    projects.splice(projectIndex,1);
    this.setState(() => ({
      openModal: false,
      showDetail: false,
      projects
    }));
  };

  render(){
    return(
      <div>
        <Header logout = {true}/>
        <div className = "project__list">
        <PageHeader newProject = {this.AddDetail} />
        <WorkView
          works={this.state.projects}
          ShowDetails={this.ShowDetails}
        />
        {
          (this.state.openModal)?
          <ProjectModal
            openModal = {this.state.openModal}
            addDetail = {this.state.addDetail}
            showDetail = {this.state.showDetail}
            editDetail = {this.state.editDetail}
            project = {this.state.project}
            SubmitDetails = {this.SubmitDetails}
            DiscardDetails = {this.DiscardDetails}
            EditDetails = {this.EditDetails}
            DeleteProject = {this.DeleteProject}
            EditProject = {this.EditProject}
          />
          :
          ''
        }
        </div>
      </div>
    )
  }
}