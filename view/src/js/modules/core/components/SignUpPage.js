import React from "react";
import SignUpForm from "./SignUpForm";
import axios from "axios";
import { API_URL } from "../constants";

const SignUpPage = () => {
  const handleSubmit = values => {
    /*axios
      .post(API_URL + "/auth", values)
      .then(response => );
      */
  };
  return <SignUpForm onSubmit={handleSubmit} />;
};

export default SignUpPage;
