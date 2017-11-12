import React from "react";
import SignUpForm from "./SignUpForm";
import axios from "axios";
import { API_URL } from "../constants";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { SubmissionError } from 'redux-form'


const SignUpPage = ({ push }) => {
  const handleSubmit = values => {
    return axios
      .post(API_URL + "/auth", {
        ...values,
        confirm_success_url: "http://localhost:3000"
      })
      .then(response => push("/"))
      .catch(error => {
        throw new SubmissionError({ _error: error });
      });
  };
  return <SignUpForm onSubmit={handleSubmit} />;
};

const mapDispatchToProps = dispatch => ({
  push: route => dispatch(push(route))
});

export default connect(null, mapDispatchToProps)(SignUpPage);
