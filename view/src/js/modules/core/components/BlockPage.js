import React, { Component } from "react";
import AceEditor from "react-ace";
import { API_URL } from "../constants";
import FlatButton from "material-ui/FlatButton";
import axios from "axios";
import { createLib } from "../utils";

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
    const code = this.state.editorState;
    const data = {
      block: {
        code
      }
    };
    axios
      .post(API_URL + "/blocks", data)
      .then(response => console.log(response));
    const lib = createLib(window);
    lib.nicholaslyang.linter({ code }).then(result => console.log(result));
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
