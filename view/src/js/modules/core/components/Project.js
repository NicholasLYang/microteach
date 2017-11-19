import React from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import { gql } from "apollo-client-preset";

const PROJECTS_QUERY = gql`
  query UserProjectsQuery($id: ID!) {
    project(id: $id) {
      id
      name
      current_exercise
      blocks {
        id
        exercise {
          name
        }
      }
    }
  }
`;
const Project = ({ data: { loading, project }, match }) => {
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>
        {" "}{project.name}{" "}
      </h1>
      {project.blocks.map(block =>
        <Link
          to={"/projects/" + match.params.projectId + "/blocks/" + block.id}
          key={block.id}
        >
          <h2>
            {project.current_exercise === block.exercise.id
              ? <b>
                  {" "}{block.exercise.name}{" "}
                </b>
              : block.exercise.name}
          </h2>
        </Link>
      )}
    </div>
  );
};
export default graphql(PROJECTS_QUERY, {
  options: ({ match }) => ({ variables: { id: match.params.projectId } })
})(Project);
