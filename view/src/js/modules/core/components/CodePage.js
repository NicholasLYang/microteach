import React, { Component } from "react";
import AceEditor from "react-ace";

class CodePage extends Component {
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
    console.log(eval(this.state.editorState));
  };

  render() {
    return (
      <div>
        <AceEditor
          mode="javascript"
          theme="github"
          value={this.state.editorState}
          onChange={this.handleChange}
          name="CodeEditor"
          editorProps={{ $blockScrolling: true }}
        />
        <button onClick={this.handleSubmit}> Submit </button>
      </div>
    );
  }
}

export default CodePage;
