import React from "react";
import injectSheet from "react-jss";
import { TextField } from "redux-form-material-ui";
import FlatButton from "material-ui/FlatButton";
import { reduxForm, Field } from "redux-form";
import { graphql } from "react-apollo";
import { gql } from "apollo-client-preset";
import { Link } from 'react-router-dom'

const styles = {
  inputs: {
    display: "flex",
    flexDirection: "column"
  }
};
const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  return errors;
};

const TUTORIAL_QUERY = gql`
  query TutorialQuery($id: ID!) {
    tutorial(id: $id) {
      name
    }
  }
`;

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

const NewProjectForm = ({
  classes,
  handleSubmit,
  submitting,
  data: { loading, tutorial }
}) =>
  <form onSubmit={handleSubmit}>
    <Link to="/projects/new"> Back </Link>
    {!loading &&
      <h3>
        {" "}You are going to {tutorial.name.toLowerCase()}{" "}
      </h3>}
    <div className={classes.inputs}>
      <Field
        name="name"
        component={renderField}
        floatingLabelText="Project Name"
        type="text"
      />
      <FlatButton type="Submit" label="Submit" disabled={submitting} />
    </div>
  </form>;

export default graphql(TUTORIAL_QUERY, {
  options: ({ tutorialId }) => ({ variables: { id: tutorialId } })
})(
  injectSheet(styles)(
    reduxForm({
      form: "newProject",
      validate
    })(NewProjectForm)
  )
);
