import React, { PureComponent } from "react";
import injectSheet from "react-jss";
import connect from "react-redux/lib/connect/connect";
import CodePage from "./CodePage"

import { refreshWindowDimensions } from "./../actions";

const styles = {
  appWrapper: {
    minHeight: "100%",
    margin: "0px auto",
    display: "flex",
    flexDirection: "row"
  },
  mainWrapper: {
    minHeight: "100%",
    margin: "0px auto",
    display: "flex",
    flexDirection: "column",
    flex: "1 0 auto"
  },
  contentWrapper: {
    maxWidth: "720px",
    minWidth: "360px",
    margin: "0 auto"
  },
  mainContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "1 0 auto",
    flexDirection: "column"
  },
  mainContent: {
    flexDirection: "column",
    display: "flex",
    flex: "1 0 auto"
  },
  appFooter: {
    height: "40px",
    textAlign: "center"
  }
};

class MainApp extends PureComponent {

  onResizeWindow = () => {
    this.props.onResizeWindow();
  };
  componentDidMount() {
    window.addEventListener("resize", this.onResizeWindow);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.onResizeWindow);
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.appWrapper}>
        <CodePage />
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
    }
  })
)(injectSheet(styles)(MainApp));

export default VisibleMainApp;
