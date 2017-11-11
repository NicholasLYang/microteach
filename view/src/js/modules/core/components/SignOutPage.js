import React, { Component } from "react";
import { connect } from "react-redux";
import { signOut } from "../actions";
import { push } from "connected-react-router";
import { delay } from "../utils";

class SignOutPage extends Component {
  componentWillMount() {
    this.props.signOut();
    delay(1000).then(response => this.props.push("/"));
  }
  render() {
    return(<div> Successfully signed out! Redirecting....</div>);
  }
}

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
  push: route => dispatch(push(route))
});

export default connect(null, mapDispatchToProps)(SignOutPage);
