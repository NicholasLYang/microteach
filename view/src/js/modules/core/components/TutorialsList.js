import React from "react";
import { gql } from "apollo-client-preset";
import { graphql } from "react-apollo"
import Tutorial from './Tutorial'

const TUTORIALS_QUERY = gql`
  query {
    tutorials {
      id
      name
    }
  }
`;
const TutorialsList = ({ data: { loading, tutorials} }) => {
  return (
    <div>
      You are going to....
      {loading
        ? <div> Loading...</div>
        : tutorials.map(tutorial => <Tutorial tutorial={tutorial}/>)}
    </div>
  );
};

export default graphql(TUTORIALS_QUERY)(TutorialsList);