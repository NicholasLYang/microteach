import React from "react";
import ProjectsList from "./ProjectsList";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

const ProjectsPage = ({ currentUser }) =>
  <div>
    {currentUser
      ? <ProjectsList currentUser={currentUser} />
      : <div>
          {" "}Please <Link to="/signin"> sign in </Link> or{" "}
          <Link to="/signup"> sign up</Link> to see your projects
        </div>}
  </div>;

const mapStateToProps = state => ({
  currentUser: state.core.currentUser
});
export default connect(mapStateToProps)(ProjectsPage);
