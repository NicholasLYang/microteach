import React, { Component } from "react";
import { API_URL } from "../constants";
import axios from "axios";
import uuidv1 from "uuid/v1";
import BlockForm from "./BlockForm";

class BlockPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
  }

  render() {
    const { errors } = this.state;
    const { match } = this.props;
    return (
      <div>
        <BlockForm
          onSubmit={this.handleSubmit}
          projectId={match.params.projectId}
          blockId={match.params.blockId}
          errors={errors}
        />
      </div>
    );
  }
}

export default BlockPage;
