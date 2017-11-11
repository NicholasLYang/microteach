import React from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { connect } from "react-redux";

const styles = {
  header: {
    padding: "20px"
  },
  link: {
    padding: "20px"
  },
  routes: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "flex-end",
    flex: "1 0 auto",
    flexWrap: "wrap"
  },
  masthead: {
    textDecoration: "none",
    "&:visited": {
      textDecoration: "none"
    }
  },
  linkBlock: {
    display: "flex",
    flexDirection: "row"
  }
};

const Header = ({ classes, currentUser }) =>
  <div className={classes.header}>
    <Link to="/">
      <div className={classes.masthead}>
        <h1> Microtea.ch </h1>
      </div>
    </Link>
    <div className={classes.routes}>
      {currentUser
        ? <div className={classes.linkBlock}>
            <Link to="/projects">
              <div className={classes.link}> Your Projects!</div>
            </Link>
            <Link to="/blocks/new">
              <div className={classes.link}> Make A New Block!</div>
            </Link>
            <Link to="/projects/new">
              <div className={classes.link}> Make A New Project!</div>
            </Link>
            <Link to="/signout">
              <div className={classes.link}> Sign Out!</div>
            </Link>
          </div>
        : <div className={classes.linkBlock}>
            <Link to="/signup">
              <div className={classes.link}> Sign up!</div>
            </Link>
            <Link to="/signin">
              <div className={classes.link}> Sign in!</div>
            </Link>
          </div>}
    </div>
    <div>
      {currentUser &&
        <div>
          {" "}Welcome {currentUser.email}!{" "}
        </div>}
    </div>
  </div>;

const mapStateToProps = state => ({
  currentUser: state.core.currentUser
});

export default connect(mapStateToProps)(injectSheet(styles)(Header));
