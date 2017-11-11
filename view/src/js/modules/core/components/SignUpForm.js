import React from "react";
import injectSheet from "react-jss";
import { TextField } from "redux-form-material-ui";
import FlatButton from "material-ui/FlatButton";
import { reduxForm, Field } from "redux-form";

const styles = {
  inputs: {
    display: "flex",
    flexDirection: "column"
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
  return errors;
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  floatingLabelText
}) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <TextField
        {...input}
        floatingLabelText={floatingLabelText}
        placeholder={label}
        type={type}
      />
      {touched &&
        ((error &&
          <span>
            {error}
          </span>) ||
          (warning &&
            <span>
              {warning}
            </span>))}
    </div>
  </div>;

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
      <FlatButton type="Submit" label="Submit" />
    </div>
  </form>;

export default injectSheet(styles)(
  reduxForm({
    form: "signUp",
    validate
  })(SignUpForm)
);
