import React from "react";
import { gql } from "apollo-client-preset";
import { graphql } from "react-apollo";
import Project from "./Project";

const PROJECTS_QUERY = gql`
  query UserProjectsQuery($id: ID!) {
    user(id: $id) {
      projects {
        name
        blocks {
          id
        }
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
            <Project
              key={project.id}
              name={project.name}
              blocks={project.blocks}
            />
          )}
    </div>
  );
};

export default graphql(PROJECTS_QUERY, {
  options: ({ currentUser }) => ({ variables: { id: currentUser.id } })
})(ProjectsList);
