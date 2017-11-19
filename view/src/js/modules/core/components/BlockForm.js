import React, { Component } from "react";
import { graphql } from "react-apollo";
import AceEditor from "react-ace";
import RaisedButton from "material-ui/RaisedButton";
import { gql } from "apollo-client-preset";
import injectSheet from "react-jss";
import renderField from "./renderField";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { createLib } from "../utils";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { API_URL } from "../constants";
import axios from "axios";

const formSelector = formValueSelector("block");

const BLOCK_QUERY = gql`
  query BlockQuery($blockId: ID!, $projectId: ID!) {
    block(id: $blockId) {
      id
      exercise {
        prompt
        input
      }
    }
    project(id: $projectId) {
      id
      name
    }
  }
`;

const styles = {
  description: {
    maxWidth: "500px"
  },
  button: {
    padding: "10px"
  }
};
class BlockForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      editorState: "",
      notice: ""
    };
  }

  handleChange = newValue => {
    this.setState({ editorState: newValue });
  };

  handleSubmit = () => {
    const { email, username, password, projectId, blockId, data } = this.props;
    const { editorState } = this.state;
    const { input } = data.block.exercise;
    const d = new Date()
    const functionName = "microteach-" + projectId + "-" + blockId + "-" + (d.getTime() % 100).toString();
    const lib = createLib(window);
    lib.nicholaslyang.createFunction["@0.2.0"]({
      functionName,
      email,
      username,
      password,
      code: editorState
    })
    .then(response => {
        console.log(response);
        lib.nicholaslyang[functionName]["@dev"]({jsonInput: input})
    })
    .then(response =>
        axios.post(API_URL + "/blocks", {
          code: editorState,
          function_name: functionName,
          project_id: projectId
        })
      );
  };

  handleLint = () => {
    this.setState({ notice: "" });
    const { editorState } = this.state;
    const lib = createLib(window);
    lib.nicholaslyang.linter({ code: editorState }).then(result => {
      if (result.length > 0) {
        this.setState({ errors: result, notice: "" });
      } else {
        this.setState({ notice: "All good!", errors: [] });
      }
    });
  };

  render() {
    const { data, classes, projectId } = this.props;
    const { errors, notice } = this.state;
    return (
      <form>
        {!data.loading &&
          <div>
            <Link to={"/projects/" + projectId}>
              <h1>
                {" "}{data.project.name}{" "}
              </h1>
            </Link>
            <div
              className={classes.description}
              dangerouslySetInnerHTML={{ __html: data.block.exercise.prompt }}
            />
          </div>}
        {errors.map(error =>
          <div key={error.id} className="error">
            {" "}{`(${error.line}, ${error.column}): ${error.message}`}{" "}
          </div>
        )}
        {notice &&
          <span className="notice">
            {" "}{notice}{" "}
          </span>}
        <AceEditor
          mode="javascript"
          onChange={this.handleChange}
          value={this.state.editorState}
          name="CodeEditor"
          editorProps={{ $blockScrolling: true }}
        />
        <div className={classes.button}>
          <RaisedButton primary={true} label="Test" onClick={this.handleLint} />
        </div>
        <h3> stdlib Login </h3>
        <div className={classes.description}>
          Use your stdlib credentials to run the code!
        </div>
        <Field
          name="email"
          component={renderField}
          floatingLabelText="Email"
          type="email"
        />
        <Field
          name="username"
          component={renderField}
          floatingLabelText="Username"
          type="text"
        />
        <Field
          name="password"
          component={renderField}
          floatingLabelText="Password"
          type="password"
        />
        <div className={classes.button}>
          <RaisedButton
            primary={true}
            onClick={this.handleSubmit}
            label="Submit"
          />
        </div>
      </form>
    );
  }
}
const mapStateToProps = state => ({
  email: formSelector(state, "email"),
  username: formSelector(state, "username"),
  password: formSelector(state, "password")
});
export default connect(mapStateToProps)(
  graphql(BLOCK_QUERY, {
    options: ({ projectId, blockId }) => ({ variables: { projectId, blockId } })
  })(
    injectSheet(styles)(
      reduxForm({
        form: "block"
      })(BlockForm)
    )
  )
);
