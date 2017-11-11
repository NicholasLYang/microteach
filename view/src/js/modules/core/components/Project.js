import React from "react";

const Project = ({ name, blocks }) =>
  <div>
    <h3>
      {" "}{name}{" "}
    </h3>
    {blocks && blocks.map(block => <div key={block.id}> block.id </div>)}
  </div>;

export default Project;
