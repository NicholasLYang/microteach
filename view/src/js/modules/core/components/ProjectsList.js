import React from "react";
import { gql } from "apollo-client-preset";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom"

const PROJECTS_QUERY = gql`
  query UserProjectsQuery($id: ID!) {
    user(id: $id) {
      projects {
        id
        name
      }
    }
  }
`;
const ProjectsList = ({ data }) => {
  return (
    <div>
      Here are your projects!
      {data.loading
        ? <div> Loading...</div>
        : data.user.projects.map(project =>
            <Link to={"/projects/" + project.id}>
              <h3> {project.name} </h3>
            </Link>
          )}
    </div>
  );
};

export default graphql(PROJECTS_QUERY, {
  options: ({ currentUser }) => ({ variables: { id: currentUser.id } })
})(ProjectsList);
