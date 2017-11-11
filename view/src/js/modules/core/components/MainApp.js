import React, { PureComponent } from "react";
import injectSheet from "react-jss";
import { withRouter } from "react-router-dom"
import Header from "./Header"
import connect from "react-redux/lib/connect/connect";

import { refreshWindowDimensions } from "./../actions";
import { createUserSession } from '../actions'

const styles = {
  appWrapper: {
    fontFamily: "Proza Libre, sans-serif",
    minHeight: "100%",
    margin: "0px auto",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
};

class MainApp extends PureComponent {

  onResizeWindow = () => {
    this.props.onResizeWindow();
  };
  componentDidMount() {
    const token = localStorage.getItem("token");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser !== null && token !== null) {
      this.props.createUserSession(currentUser, token)
    }
    window.addEventListener("resize", this.onResizeWindow);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.onResizeWindow);
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.appWrapper}>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

const VisibleMainApp = connect(
  (state, ownProps) => ({
    language: state.core.language,
    viewportWidth: state.core.viewportWidth,
    viewportHeight: state.core.viewportHeight
  }),
  dispatch => ({
    onResizeWindow: () => {
      dispatch(refreshWindowDimensions());
    },
    createUserSession: (user, token) => dispatch(createUserSession(user, token)),
  })
)(injectSheet(styles)(MainApp));

export default withRouter(VisibleMainApp);
