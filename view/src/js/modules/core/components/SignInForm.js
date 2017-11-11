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
          <span className="error">
            {error}
          </span>) ||
          (warning &&
            <span>
              {warning}
            </span>))}
    </div>
  </div>;

const SignInForm = ({ classes, handleSubmit, submitting }) =>
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
      <FlatButton type="Submit" label="Submit" disabled={submitting} />
    </div>
  </form>;

export default injectSheet(styles)(
  reduxForm({
    form: "signIn",
    validate
  })(SignInForm)
);
