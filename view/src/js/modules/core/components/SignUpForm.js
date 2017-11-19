import React from "react";
import injectSheet from "react-jss";
import FlatButton from "material-ui/FlatButton";
import { reduxForm, Field } from "redux-form";
import renderField from './renderField'

const styles = {
  inputs: {
    display: "flex",
    flexDirection: "column"
  },
  submitButton: {
    maxWidth: "100px"
  }
};
const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  if (!values.password_confirmation) {
    errors.password_confirmation = "Required";
  } else if (values.password !== values.password_confirmation) {
    errors.password_confirmation =
      "Password and password confirmation must be the same";
  }
  return errors;
};

const SignUpForm = ({ classes, handleSubmit }) =>
  <form onSubmit={handleSubmit}>
    <div className={classes.inputs}>
      <Field
        name="email"
        component={renderField}
        floatingLabelText="Email"
        type="email"
      />
      <Field
        name="password"
        component={renderField}
        floatingLabelText="Password"
        type="password"
      />
      <Field
        name="password_confirmation"
        component={renderField}
        floatingLabelText="Password Confirmation"
        type="password"
      />
      <div className={classes.submitButton}>
      <FlatButton type="Submit" label="Submit" />
      </div>
    </div>
  </form>;

export default injectSheet(styles)(
  reduxForm({
    form: "signUp",
    validate
  })(SignUpForm)
);
