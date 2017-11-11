import React, { Component } from "react";
import AceEditor from "react-ace";
import { API_URL } from "../constants";
import FlatButton from "material-ui/FlatButton";
import axios from "axios";
import esprima from "esprima"

class BlockPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: ""
    };
  }

  handleChange = newValue => {
    this.setState({ editorState: newValue });
  };

  handleSubmit = () => {
    const data = {
      block: {
        user_id: 1,
        code: this.state.editorState
      }
    };
    axios
      .post(API_URL + "/blocks", data)
      .then(response => console.log(response));
  };

  render() {
    return (
      <div>
        <AceEditor
          mode="javascript"
          value={this.state.editorState}
          onChange={this.handleChange}
          name="CodeEditor"
          editorProps={{ $blockScrolling: true }}
        />
        <FlatButton onClick={this.handleSubmit} label="Submit" />
      </div>
    );
  }
}

export default BlockPage;
