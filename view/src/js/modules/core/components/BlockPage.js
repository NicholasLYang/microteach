import React, { Component } from "react";
import { API_URL } from "../constants";
import axios from "axios";
import uuidv1 from "uuid/v1";
import { createLib } from "../utils";
import BlockForm from "./BlockForm";
import { connect } from "react-redux";

class BlockPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }
  handleSubmit = (code, email, username, password) => {
    const data = {
      block: {
        project_id: 1,
        code
      }
    };
    const lib = createLib(window);
    lib.nicholaslyang
      .linter({ code })
      .then(result => {
        if (result.length > 0) {
          console.log(result);
          this.setState({ errors: result });
        } else {
          return lib.nicholaslyang.createFunction({
            functionName: "Microteach/" + uuidv1(),
            email,
            username,
            password
          });
        }
      })
      .then(response => console.log(response));
  };
  render() {
    const { errors } = this.state;
    const { currentBlock } = this.props;
    return (
      <div>
        <BlockForm id={currentBlock} errors={errors} handleSubmit={this.handleSubmit} />
      </div>
    );
  }
};
const mapStateToProps = state => ({
  currentBlock: state.core.currentBlock
});
export default connect(mapStateToProps)(BlockPage);
