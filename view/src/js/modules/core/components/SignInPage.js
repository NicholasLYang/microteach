import React from "react";
import SignInForm from "./SignInForm";
import axios from "axios";
import { API_URL } from "../constants";
import { createUserSession } from "../actions";
import { connect } from "react-redux";
import { push } from "connected-react-router"
import { SubmissionError } from "redux-form"

const SignInPage = ({ createUserSession }) => {
  const handleSubmit = values => {
    return axios
      .post(API_URL + "/auth/sign_in", values)
      .then(response => {
        const token = response.headers["access-token"];
        const currentUser = response.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        console.log(JSON.stringify(currentUser))
        createUserSession(currentUser, token);
        push("/")
      })
      .catch(error => {
        throw new SubmissionError({ _error: error });
      });
  };
  return <SignInForm onSubmit={handleSubmit} />;
};

const mapDispatchToProps = dispatch => ({
  createUserSession: (user, token) => dispatch(createUserSession(user, token)),
  push: route => dispatch(push(route))
});

export default connect(null, mapDispatchToProps)(SignInPage);
