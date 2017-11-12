import React, { Component } from "react";
import { graphql } from "react-apollo";
import AceEditor from "react-ace";
import FlatButton from "material-ui/FlatButton";
import { gql } from "apollo-client-preset";
import injectSheet from "react-jss";
import renderField from "./renderField";
import { reduxForm, Field } from "redux-form"

const BLOCK_QUERY = gql`
  query BlockQuery($id: ID!) {
    block(id: $id) {
      exercise {
        prompt
      }
    }
  }
`;

const styles = {
  description: {
    maxWidth: "500px"
  }
};
class BlockForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: "",
    };
  }

  handleChange = newValue => {
    this.setState({ editorState: newValue });
  };

  handleClick = () => {
    this.props.handleSubmit(this.state.editorState);
  };

  render() {
    const { data, classes, errors } = this.props;
    return (
      <div>
        {!data.loading &&
          <div
            className={classes.description}
            dangerouslySetInnerHTML={{ __html: data.block.exercise.prompt }}
          />}
        {errors.map(error =>
          <div className="error">
            {" "}{`(${error.line}, ${error.column}): ${error.message}`}{" "}
          </div>
        )}
        <AceEditor
          mode="javascript"
          value={this.state.editorState}
          onChange={this.handleChange}
          name="CodeEditor"
          editorProps={{ $blockScrolling: true }}
        />
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
        <FlatButton onClick={this.handleClick} label="Submit" />
      </div>
    );
  }
}
export default graphql(BLOCK_QUERY, {
  options: ({ id }) => ({ variables: { id: id } })
})(injectSheet(styles)(reduxForm({
  form: "block"
})(BlockForm)));
