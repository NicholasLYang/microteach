import React from "react";
import TutorialsList from "./TutorialsList";
import { connect } from "react-redux";
import NewProjectForm from "./NewProjectForm";
import axios from "axios"
import { SubmissionError } from 'redux-form'
import { API_URL } from '../constants'
import { push } from "connected-react-router"


const NewProjectPage = ({ location, currentUser }) => {
  const search = location.search;
  const params = new URLSearchParams(search);
  const tutorialId = params.get("tutorial");

  const handleSubmit = values => {
    const data = {
      ...values,
      user_id: currentUser.id,
      tutorial_id: tutorialId
    }
    return axios
      .post(`${API_URL}/projects`, data)
      .then(response => {
        push("/projects")
      })
      .catch(error => {
        throw new SubmissionError({ _error: error });
      });
  };
  return (
    <div>
      {tutorialId
        ? <NewProjectForm onSubmit={handleSubmit} tutorialId={tutorialId} />
        : <TutorialsList />}
    </div>
  );
};
const mapStateToProps = state => ({
  location: state.router.location,
  currentUser: state.core.currentUser
});

const mapDispatchToProps = dispatch => ({
  push: route => dispatch(push(route))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectPage);
