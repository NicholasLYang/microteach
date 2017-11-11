import React from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

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
  }
};

const Header = ({ classes }) =>
  <div className={classes.header}>
    <Link to="/">
      <div className={classes.masthead}>
        <h1> Microteach </h1>
      </div>
    </Link>
    <div className={classes.routes}>
      <Link to="/blocks/new">
        <div className={classes.link}> Make A New Block!</div>
      </Link>
      <Link to="/users/new">
        <div className={classes.link}> Sign up!</div>
      </Link>
    </div>
  </div>;

export default injectSheet(styles)(Header);
